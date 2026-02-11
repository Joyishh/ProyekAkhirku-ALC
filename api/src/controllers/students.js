import Student from "../models/studentModel.js";
import Users from "../models/userModel.js";
import StudentParent from "../models/studentParentModel.js";
import StudentEnrollment from "../models/studentEnrollmentModel.js";
import Package from "../models/packageModel.js";
import db from "../config/database.js";

/**
 * Get All Students (Lightweight for Table View)
 * Optimized for listing - minimal data, no heavy joins
 */
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            attributes: ['studentId', 'fullname', 'dateOfBirth', 'gender', 'classLevel', 'createdAt'],
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['username', 'email']
                },
                {
                    model: StudentEnrollment,
                    as: 'enrollments',
                    attributes: ['status', 'packageId', 'enrollmentDate'],
                    where: { status: 'aktif' },
                    required: false, // LEFT JOIN - show students even without active enrollment
                    include: [
                        {
                            model: Package,
                            as: 'package',
                            attributes: ['packageName']
                        }
                    ]
                }
            ],
            order: [['fullname', 'ASC']]
        });

        // Transform data for frontend table
        const formattedStudents = students.map(student => {
            const activeEnrollment = student.enrollments && student.enrollments.length > 0 
                ? student.enrollments[0] 
                : null;

            return {
                id: student.studentId,
                studentId: `STD${String(student.studentId).padStart(3, '0')}`,
                name: student.fullname,
                username: student.user?.username || 'N/A',
                email: student.user?.email || 'N/A',
                program: activeEnrollment?.package?.packageName || 'No Active Program',
                status: activeEnrollment ? 'active' : 'inactive',
                joined: new Date(student.createdAt).toISOString().split('T')[0],
                dob: student.dateOfBirth,
                gender: student.gender === 'L' ? 'Laki-laki' : 'Perempuan',
                classLevel: student.classLevel || '-'
            };
        });

        return res.status(200).json({
            success: true,
            data: formattedStudents
        });

    } catch (error) {
        console.error("Get all students error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data siswa",
            error: error.message
        });
    }
};

/**
 * Get Student Detail (Heavy for Edit Modal)
 * Includes all related data: user, parent, enrollment history
 */
export const getStudentDetail = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findByPk(studentId, {
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['user_id', 'username', 'email', 'role_id']
                },
                {
                    model: StudentParent,
                    as: 'parent',
                    attributes: ['parentId', 'parentName', 'parentPhone']
                },
                {
                    model: StudentEnrollment,
                    as: 'enrollments',
                    include: [
                        {
                            model: Package,
                            as: 'package',
                            attributes: ['packageId', 'packageName', 'basePrice']
                        }
                    ],
                    order: [['enrollmentDate', 'DESC']]
                }
            ]
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Data siswa tidak ditemukan"
            });
        }

        // Format detailed response
        const detailedData = {
            studentId: student.studentId,
            id: `STD${String(student.studentId).padStart(3, '0')}`,
            fullname: student.fullname,
            dateOfBirth: student.dateOfBirth,
            gender: student.gender,
            genderDisplay: student.gender === 'L' ? 'Laki-laki' : 'Perempuan',
            address: student.address,
            classLevel: student.classLevel,
            user: {
                username: student.user?.username,
                email: student.user?.email
            },
            parent: {
                parentName: student.parent?.parentName || 'N/A',
                parentPhone: student.parent?.parentPhone || 'N/A'
            },
            enrollments: student.enrollments.map(enrollment => ({
                enrollmentId: enrollment.enrollmentId,
                packageName: enrollment.package?.packageName,
                status: enrollment.status,
                enrollmentDate: enrollment.enrollmentDate
            })),
            activeProgram: student.enrollments.find(e => e.status === 'aktif')?.package?.packageName || 'No Active Program',
            joined: new Date(student.createdAt).toISOString().split('T')[0]
        };

        return res.status(200).json({
            success: true,
            data: detailedData
        });

    } catch (error) {
        console.error("Get student detail error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil detail siswa",
            error: error.message
        });
    }
};

/**
 * Update Student Data (Transaction)
 * Updates Student and StudentParent tables
 */
export const updateStudent = async (req, res) => {
    const t = await db.transaction();

    try {
        const { studentId } = req.params;
        const { 
            fullname, 
            address, 
            gender, 
            dateOfBirth, 
            classLevel,
            parentName, 
            parentPhone 
        } = req.body;

        // 1. Find student
        const student = await Student.findByPk(studentId, { transaction: t });

        if (!student) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Data siswa tidak ditemukan"
            });
        }

        // 2. Validate gender format
        let genderCode = gender;
        if (gender && gender.length > 1) {
            // Convert from "Laki-laki" / "Perempuan" to "L" / "P"
            genderCode = gender.toLowerCase().includes('laki') ? 'L' : 'P';
        }

        // 3. Update Student table
        await student.update({
            fullname: fullname || student.fullname,
            address: address || student.address,
            gender: genderCode || student.gender,
            dateOfBirth: dateOfBirth || student.dateOfBirth,
            classLevel: classLevel !== undefined ? classLevel : student.classLevel
        }, { transaction: t });

        // 4. Update StudentParent table
        if (parentName || parentPhone) {
            const studentParent = await StudentParent.findOne({
                where: { studentId: student.studentId },
                transaction: t
            });

            if (studentParent) {
                await studentParent.update({
                    parentName: parentName || studentParent.parentName,
                    parentPhone: parentPhone || studentParent.parentPhone
                }, { transaction: t });
            } else {
                // Create parent record if doesn't exist
                await StudentParent.create({
                    studentId: student.studentId,
                    parentName: parentName,
                    parentPhone: parentPhone
                }, { transaction: t });
            }
        }

        // 5. Commit transaction
        await t.commit();

        // 6. Fetch updated data with relations
        const updatedStudent = await Student.findByPk(studentId, {
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['username', 'email']
                },
                {
                    model: StudentParent,
                    as: 'parent',
                    attributes: ['parentName', 'parentPhone']
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Data siswa berhasil diperbarui",
            data: {
                studentId: updatedStudent.studentId,
                fullname: updatedStudent.fullname,
                gender: updatedStudent.gender,
                dateOfBirth: updatedStudent.dateOfBirth,
                address: updatedStudent.address,
                classLevel: updatedStudent.classLevel,
                parentName: updatedStudent.parent?.parentName,
                parentPhone: updatedStudent.parent?.parentPhone
            }
        });

    } catch (error) {
        await t.rollback();
        console.error("Update student error:", error);

        // Handle specific Sequelize errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: "Data tidak valid",
                errors: error.errors.map(e => e.message)
            });
        }

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat memperbarui data siswa",
            error: error.message
        });
    }
};