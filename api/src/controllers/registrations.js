import Users from "../models/userModel.js";
import Registration from "../models/registrationModel.js";
import Package from "../models/packageModel.js";
import argon2 from "argon2";
import db from "../config/database.js";

/**
 * Create new student registration by Admin
 * This function creates both User account and Registration record in a transaction
 */
export const createRegistrationByAdmin = async (req, res) => {
    // Start transaction
    const t = await db.transaction();
    
    try {
        const { 
            username, 
            email, 
            password, 
            confirmPassword, 
            fullName, 
            dateOfBirth, 
            gender, 
            address, 
            parentName, 
            parentPhone, 
            selectedPackage, 
            paymentMethod 
        } = req.body;

        // 1. Validate required fields
        if (!username || !email || !password || !confirmPassword || !fullName || 
            !dateOfBirth || !gender || !address || !parentName || !parentPhone || 
            !selectedPackage) {
            await t.rollback();
            return res.status(400).json({ 
                success: false,
                message: "Semua field wajib diisi" 
            });
        }

        // 2. Validate password match
        if (password !== confirmPassword) {
            await t.rollback();
            return res.status(400).json({ 
                success: false,
                message: "Password dan konfirmasi password tidak cocok" 
            });
        }

        // 3. Validate password length
        if (password.length < 6) {
            await t.rollback();
            return res.status(400).json({ 
                success: false,
                message: "Password minimal 6 karakter" 
            });
        }

        // 4. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            await t.rollback();
            return res.status(400).json({ 
                success: false,
                message: "Format email tidak valid" 
            });
        }

        // 5. Check if username already exists
        const existingUsername = await Users.findOne({
            where: { username: username },
            transaction: t
        });
        if (existingUsername) {
            await t.rollback();
            return res.status(400).json({ 
                success: false,
                message: "Username sudah digunakan" 
            });
        }

        // 6. Check if email already exists
        const existingEmail = await Users.findOne({
            where: { email: email },
            transaction: t
        });
        if (existingEmail) {
            await t.rollback();
            return res.status(400).json({ 
                success: false,
                message: "Email sudah terdaftar" 
            });
        }

        // 7. Verify package exists
        const packageExists = await Package.findByPk(selectedPackage, { transaction: t });
        if (!packageExists) {
            await t.rollback();
            return res.status(400).json({ 
                success: false,
                message: "Paket yang dipilih tidak valid" 
            });
        }

        // 8. Hash password
        const hashedPassword = await argon2.hash(password);

        // 9. Create User with role_id = 3 (Student)
        const newUser = await Users.create({
            username: username,
            email: email,
            password: hashedPassword,
            role_id: 3 // Force Student role
        }, { transaction: t });

        // 10. Create Registration record
        const newRegistration = await Registration.create({
            userId: newUser.user_id,
            studentFullname: fullName,
            studentDateOfBirth: dateOfBirth,
            studentGender: gender,
            studentAddress: address,
            parentName: parentName,
            parentPhone: parentPhone,
            selectedPackageId: selectedPackage,
            paymentMethod: paymentMethod || null,
            status: 'pending_review'
        }, { transaction: t });

        // 11. Commit transaction
        await t.commit();

        return res.status(201).json({ 
            success: true,
            message: "Pendaftaran siswa berhasil dibuat. Status: Menunggu pembayaran dan verifikasi.",
            data: {
                userId: newUser.user_id,
                registrationId: newRegistration.registrationId,
                username: newUser.username,
                email: newUser.email,
                fullName: newRegistration.studentFullname,
                status: newRegistration.status
            }
        });

    } catch (error) {
        // Rollback transaction on error
        await t.rollback();
        console.error("Registration error:", error);
        
        // Handle specific Sequelize errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                success: false,
                message: "Data tidak valid",
                error: error.errors.map(e => e.message)
            });
        }
        
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ 
                success: false,
                message: "Paket yang dipilih tidak ditemukan"
            });
        }

        return res.status(500).json({ 
            success: false,
            message: "Terjadi kesalahan pada server saat membuat pendaftaran",
            error: error.message 
        });
    }
};

/**
 * Get all registrations (for admin view)
 */
export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.findAll({
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['user_id', 'username', 'email']
                },
                {
                    model: Package,
                    as: 'package',
                    attributes: ['packageId', 'packageName', 'basePrice']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        console.error("Get registrations error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data pendaftaran",
            error: error.message
        });
    }
};

/**
 * Get registration by ID
 */
export const getRegistrationById = async (req, res) => {
    try {
        const { registrationId } = req.params;

        const registration = await Registration.findByPk(registrationId, {
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['user_id', 'username', 'email']
                },
                {
                    model: Package,
                    as: 'package',
                    attributes: ['packageId', 'packageName', 'basePrice']
                }
            ]
        });

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Pendaftaran tidak ditemukan"
            });
        }

        return res.status(200).json({
            success: true,
            data: registration
        });
    } catch (error) {
        console.error("Get registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data pendaftaran",
            error: error.message
        });
    }
};

/**
 * Update registration status (approve/reject)
 */
export const updateRegistrationStatus = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const { status, adminNotes } = req.body;

        // Validate status value
        if (!['pending_review', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status tidak valid. Gunakan: pending_review, approved, atau rejected"
            });
        }

        const registration = await Registration.findByPk(registrationId);

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Pendaftaran tidak ditemukan"
            });
        }

        registration.status = status;
        if (adminNotes) {
            registration.adminNotes = adminNotes;
        }
        await registration.save();

        return res.status(200).json({
            success: true,
            message: `Pendaftaran berhasil di${status === 'approved' ? 'setujui' : status === 'rejected' ? 'tolak' : 'update'}`,
            data: registration
        });
    } catch (error) {
        console.error("Update registration status error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengupdate status pendaftaran",
            error: error.message
        });
    }
};