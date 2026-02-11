import db from "../config/database.js";
import Class from "../models/classModel.js";
import Package from "../models/packageModel.js";
import ClassMember from "../models/classMemberModel.js";
import Student from "../models/studentModel.js";
import Users from "../models/userModel.js";

/**
 * Get All Classes
 * Fetches all classes with their associated packages
 */
export const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll({
            include: [
                {
                    model: Package,
                    as: 'package',
                    attributes: ['packageId', 'packageName']
                }
            ],
            order: [['className', 'ASC']]
        });

        return res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data kelas',
            data: classes
        });

    } catch (error) {
        console.error("Get all classes error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data kelas",
            error: error.message
        });
    }
};

/**
 * Create New Class
 * Creates a new class record with package association
 */
export const createClass = async (req, res) => {
    try {
        const { package_id, class_name, capacity } = req.body;

        // Validate required fields
        if (!package_id || !class_name) {
            return res.status(400).json({
                success: false,
                message: "Package ID dan nama kelas wajib diisi"
            });
        }

        // Verify package exists
        const packageExists = await Package.findByPk(package_id);
        if (!packageExists) {
            return res.status(404).json({
                success: false,
                message: "Paket tidak ditemukan"
            });
        }

        // Create new class
        const newClass = await Class.create({
            packageId: package_id,
            className: class_name,
            capacity: capacity || 30,
            status: 'active'
        });

        // Fetch the created class with package info
        const classWithPackage = await Class.findByPk(newClass.classId, {
            include: [
                {
                    model: Package,
                    as: 'package',
                    attributes: ['packageId', 'packageName']
                }
            ]
        });

        return res.status(201).json({
            success: true,
            message: "Kelas berhasil dibuat",
            data: classWithPackage
        });

    } catch (error) {
        console.error("Create class error:", error);

        // Handle unique constraint error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: "Nama kelas sudah digunakan"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat membuat kelas",
            error: error.message
        });
    }
};

/**
 * Get Class By ID
 * Fetches detailed class information including members and their student data
 */
export const getClassById = async (req, res) => {
    try {
        const { id } = req.params;

        const classData = await Class.findByPk(id, {
            include: [
                {
                    model: Package,
                    as: 'package',
                    attributes: ['packageId', 'packageName', 'description']
                },
                {
                    model: ClassMember,
                    as: 'members',
                    include: [
                        {
                            model: Student,
                            as: 'student',
                            attributes: ['studentId', 'fullname', 'gender', 'classLevel'],
                            include: [
                                {
                                    model: Users,
                                    as: 'user',
                                    attributes: ['username', 'email']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: "Kelas tidak ditemukan"
            });
        }

        // Transform data for better frontend consumption
        const formattedData = {
            classId: classData.classId,
            className: classData.className,
            capacity: classData.capacity,
            status: classData.status,
            package: {
                packageId: classData.package?.packageId,
                packageName: classData.package?.packageName,
                description: classData.package?.description
            },
            currentEnrollment: classData.members.length,
            members: classData.members.map(member => ({
                memberId: member.memberId,
                studentId: member.student?.studentId,
                studentName: member.student?.fullname,
                gender: member.student?.gender,
                classLevel: member.student?.classLevel,
                username: member.student?.user?.username,
                email: member.student?.user?.email
            }))
        };

        return res.status(200).json({
            success: true,
            message: "Berhasil mengambil detail kelas",
            data: formattedData
        });

    } catch (error) {
        console.error("Get class by ID error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil detail kelas",
            error: error.message
        });
    }
};

/**
 * Add Students to Class
 * Bulk add multiple students to a class as members
 */
export const addStudentsToClass = async (req, res) => {
    const t = await db.transaction();

    try {
        const { id } = req.params;
        const { student_ids } = req.body;

        // Validate required fields
        if (!student_ids || !Array.isArray(student_ids) || student_ids.length === 0) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Student IDs harus berupa array dan tidak boleh kosong"
            });
        }

        // Verify class exists
        const classExists = await Class.findByPk(id, { transaction: t });
        if (!classExists) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Kelas tidak ditemukan"
            });
        }

        // Check current enrollment
        const currentMembers = await ClassMember.count({
            where: { classId: id },
            transaction: t
        });

        if (currentMembers + student_ids.length > classExists.capacity) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: `Kapasitas kelas tidak mencukupi. Tersisa ${classExists.capacity - currentMembers} slot, mencoba menambah ${student_ids.length} siswa`
            });
        }

        // Verify all students exist
        const students = await Student.findAll({
            where: { studentId: student_ids },
            attributes: ['studentId'],
            transaction: t
        });

        if (students.length !== student_ids.length) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Beberapa student ID tidak valid"
            });
        }

        // Check for duplicate enrollments
        const existingMembers = await ClassMember.findAll({
            where: {
                classId: id,
                studentId: student_ids
            },
            transaction: t
        });

        if (existingMembers.length > 0) {
            await t.rollback();
            const duplicateIds = existingMembers.map(m => m.studentId);
            return res.status(400).json({
                success: false,
                message: "Beberapa siswa sudah terdaftar di kelas ini",
                duplicateStudentIds: duplicateIds
            });
        }

        // Bulk create class members
        const membersData = student_ids.map(studentId => ({
            classId: id,
            studentId: studentId,
            enrollmentId: null // Can be set later if needed
        }));

        const newMembers = await ClassMember.bulkCreate(membersData, { transaction: t });

        await t.commit();

        return res.status(201).json({
            success: true,
            message: `Berhasil menambahkan ${newMembers.length} siswa ke kelas`,
            data: {
                classId: id,
                addedStudents: newMembers.length,
                totalMembers: currentMembers + newMembers.length,
                capacity: classExists.capacity
            }
        });

    } catch (error) {
        await t.rollback();
        console.error("Add students to class error:", error);

        // Handle foreign key constraint errors
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                success: false,
                message: "Referensi data tidak valid (Class atau Student tidak ditemukan)"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat menambahkan siswa ke kelas",
            error: error.message
        });
    }
};