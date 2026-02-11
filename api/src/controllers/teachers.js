import db from "../config/database.js";
import Users from "../models/userModel.js";
import Teacher from "../models/teacherModel.js";
import argon2 from "argon2";

/**
 * Get All Teachers
 * Fetches all teachers with their associated user accounts
 */
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['userId', 'username', 'email', 'roleId', 'avatar']
                }
            ],
            order: [['fullname', 'ASC']]
        });

        // Format data for frontend
        const formattedTeachers = teachers.map(teacher => ({
            teacherId: teacher.teacherId,
            id: `TCH${String(teacher.teacherId).padStart(3, '0')}`,
            fullname: teacher.fullname,
            phone: teacher.phone,
            specialization: teacher.specialization,
            username: teacher.user?.username,
            email: teacher.user?.email,
            avatar: teacher.user?.avatar,
            createdAt: teacher.createdAt
        }));

        return res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data guru',
            data: formattedTeachers
        });

    } catch (error) {
        console.error("Get all teachers error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data guru",
            error: error.message
        });
    }
};

/**
 * Create New Teacher
 * Creates both User account and Teacher profile in a transaction
 */
export const createTeacher = async (req, res) => {
    const t = await db.transaction();

    try {
        const { 
            username, 
            email, 
            password, 
            confirmPassword,
            fullname, 
            phone, 
            specialization 
        } = req.body;

        // 1. Validate required fields
        if (!username || !email || !password || !confirmPassword || !fullname) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Username, email, password, dan nama lengkap wajib diisi"
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

        // 7. Hash password
        const hashedPassword = await argon2.hash(password);

        // 8. Create User with role_id = 2 (Teacher)
        const newUser = await Users.create({
            username: username,
            email: email,
            password: hashedPassword,
            roleId: 2 // Teacher role
        }, { transaction: t });

        // 9. Create Teacher profile
        const newTeacher = await Teacher.create({
            userId: newUser.userId,
            fullname: fullname,
            phone: phone || null,
            specialization: specialization || null
        }, { transaction: t });

        // 10. Commit transaction
        await t.commit();

        // 11. Fetch created teacher with user data
        const createdTeacher = await Teacher.findByPk(newTeacher.teacherId, {
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['userId', 'username', 'email', 'roleId']
                }
            ]
        });

        return res.status(201).json({
            success: true,
            message: "Guru berhasil didaftarkan",
            data: {
                teacherId: createdTeacher.teacherId,
                userId: createdTeacher.userId,
                fullname: createdTeacher.fullname,
                phone: createdTeacher.phone,
                specialization: createdTeacher.specialization,
                username: createdTeacher.user?.username,
                email: createdTeacher.user?.email
            }
        });

    } catch (error) {
        await t.rollback();
        console.error("Create teacher error:", error);

        // Handle specific Sequelize errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                errors: error.errors.map(e => e.message)
            });
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: "Username atau email sudah digunakan"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mendaftarkan guru",
            error: error.message
        });
    }
};

/**
 * Get Teacher By ID
 * Fetches detailed teacher information including user account
 */
export const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await Teacher.findByPk(id, {
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['userId', 'username', 'email', 'roleId', 'avatar', 'createdAt']
                }
            ]
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Data guru tidak ditemukan"
            });
        }

        // Format detailed response
        const detailedData = {
            teacherId: teacher.teacherId,
            id: `TCH${String(teacher.teacherId).padStart(3, '0')}`,
            fullname: teacher.fullname,
            phone: teacher.phone,
            specialization: teacher.specialization,
            user: {
                userId: teacher.user?.userId,
                username: teacher.user?.username,
                email: teacher.user?.email,
                avatar: teacher.user?.avatar,
                joinedDate: teacher.user?.createdAt
            },
            createdAt: teacher.createdAt,
            updatedAt: teacher.updatedAt
        };

        return res.status(200).json({
            success: true,
            message: "Berhasil mengambil detail guru",
            data: detailedData
        });

    } catch (error) {
        console.error("Get teacher by ID error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil detail guru",
            error: error.message
        });
    }
};

/**
 * Update Teacher
 * Updates teacher profile information
 */
export const updateTeacher = async (req, res) => {
    const t = await db.transaction();

    try {
        const { id } = req.params;
        const { fullname, phone, specialization } = req.body;

        // Find teacher
        const teacher = await Teacher.findByPk(id, { transaction: t });

        if (!teacher) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Data guru tidak ditemukan"
            });
        }

        // Update teacher data
        await teacher.update({
            fullname: fullname || teacher.fullname,
            phone: phone !== undefined ? phone : teacher.phone,
            specialization: specialization !== undefined ? specialization : teacher.specialization
        }, { transaction: t });

        await t.commit();

        // Fetch updated data with user info
        const updatedTeacher = await Teacher.findByPk(id, {
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['username', 'email']
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Data guru berhasil diperbarui",
            data: {
                teacherId: updatedTeacher.teacherId,
                fullname: updatedTeacher.fullname,
                phone: updatedTeacher.phone,
                specialization: updatedTeacher.specialization,
                username: updatedTeacher.user?.username,
                email: updatedTeacher.user?.email
            }
        });

    } catch (error) {
        await t.rollback();
        console.error("Update teacher error:", error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                errors: error.errors.map(e => e.message)
            });
        }

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat memperbarui data guru",
            error: error.message
        });
    }
};