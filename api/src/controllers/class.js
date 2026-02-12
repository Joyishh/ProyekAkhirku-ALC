import db from "../config/database.js";
import Class from "../models/classModel.js";
import Package from "../models/packageModel.js";
import ClassMember from "../models/classMemberModel.js";
import ClassSchedule from "../models/classScheduleModel.js";
import Student from "../models/studentModel.js";
import { Op } from "sequelize";

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
          as: "package",
          attributes: ["packageId", "packageName"],
        },
        {
          model: ClassMember,
          as: "members",
          attributes: ["memberId"],
        },
      ],
      order: [["className", "ASC"]],
    });

    const formattedClasses = classes.map((cls) => {
      const classData = cls.toJSON();
      classData.totalMembers = classData.members.length;
      delete classData.members;
      return classData;
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil data kelas",
      data: formattedClasses,
    });
  } catch (error) {
    console.error("Get all classes error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data kelas",
      error: error.message,
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
        message: "Package ID dan nama kelas wajib diisi",
      });
    }

    if (capacity !== undefined && capacity < 1) {
      return res.status(400).json({
        success: false,
        message: "Kapasitas kelas minimal 1",
      });
    }

    // Verify package exists
    const packageExists = await Package.findByPk(package_id);
    if (!packageExists) {
      return res.status(404).json({
        success: false,
        message: "Paket tidak ditemukan",
      });
    }

    // Create new class
    const newClass = await Class.create({
      packageId: package_id,
      className: class_name,
      capacity: capacity || 30,
      status: "active",
    });

    // Fetch the created class with package info
    const classWithPackage = await Class.findByPk(newClass.classId, {
      include: [
        {
          model: Package,
          as: "package",
          attributes: ["packageId", "packageName"],
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Kelas berhasil dibuat",
      data: classWithPackage,
    });
  } catch (error) {
    console.error("Create class error:", error);

    // Handle unique constraint error
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Nama kelas sudah digunakan",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat kelas",
      error: error.message,
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
          as: "package",
          attributes: ["packageId", "packageName", "description"],
        },
        {
          model: ClassMember,
          as: "members",
          include: [
            {
              model: Student,
              as: "student",
              attributes: ["studentId", "fullname", "gender", "classLevel"],
            },
          ],
        },
      ],
    });

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Kelas tidak ditemukan",
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
        description: classData.package?.description,
      },
      currentEnrollment: classData.members.length,
      members: classData.members.map((member) => ({
        memberId: member.memberId,
        studentId: member.student?.studentId,
        studentName: member.student?.fullname,
        gender: member.student?.gender,
        classLevel: member.student?.classLevel,
        username: member.student?.user?.username,
        email: member.student?.user?.email,
      })),
    };

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail kelas",
      data: formattedData,
    });
  } catch (error) {
    console.error("Get class by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil detail kelas",
      error: error.message,
    });
  }
};

/**
 * Get Available Students for Class
 * Menampilkan daftar siswa yang punya paket sesuai TAPI belum masuk kelas ini
 */
export const getAvailableStudents = async (req, res) => {
  try {
    const { id } = req.params; // Class ID

    // 1. Cek Kelas & Paketnya
    const classData = await Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({ success: false, message: "Kelas tidak ditemukan" });
    }

    // 2. Ambil ID siswa yang SUDAH ada di kelas ini (untuk di-exclude)
    const existingMembers = await ClassMember.findAll({
      where: { classId: id },
      attributes: ['studentId']
    });
    const existingStudentIds = existingMembers.map(m => m.studentId);

    // 3. Cari Siswa yang:
    // - Punya Enrollment AKTIF untuk packageId kelas ini
    // - TIDAK ada di dalam existingStudentIds
    const candidates = await StudentEnrollment.findAll({
      where: {
        packageId: classData.packageId,
        status: 'active',
        studentId: { [Op.notIn]: existingStudentIds } // Exclude yang sudah masuk
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['studentId', 'fullname', 'classLevel', 'gender']
        }
      ]
    });

    // Format data untuk dropdown/tabel selection
    const formattedCandidates = candidates.map(c => ({
      enrollmentId: c.enrollmentId,
      studentId: c.student.studentId,
      fullname: c.student.fullname,
      classLevel: c.student.classLevel,
      gender: c.student.gender
    }));

    return res.status(200).json({
      success: true,
      data: formattedCandidates
    });

  } catch (error) {
    console.error("Get candidates error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data kandidat siswa",
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
    if (
      !student_ids ||
      !Array.isArray(student_ids) ||
      student_ids.length === 0
    ) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Student IDs harus berupa array dan tidak boleh kosong",
      });
    }

    // Verify class exists
    const classExists = await Class.findByPk(id, { transaction: t });
    if (!classExists) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Kelas tidak ditemukan",
      });
    }

    // Verify all students have active enrollment for the class's package
    const validEnrollments = await StudentEnrollment.findAll({
        where: {
            studentId: student_ids,
            packageId: classExists.packageId,
            status: 'active'
        },
        attributes: ['studentId', 'enrollmentId'],
        transaction: t
    });

    // Verify if all students passed the enrollment check
    if (validEnrollments.length !== student_ids.length) {
        await t.rollback();
        const validStudentIds = validEnrollments.map(e => e.studentId);
        const invalidStudents = student_ids.filter(id => !validStudentIds.includes(id));
        
        return res.status(400).json({
            success: false,
            message: "Beberapa siswa tidak memiliki Paket Aktif yang sesuai untuk kelas ini.",
            invalidStudentIds: invalidStudents
        });
    }

    // Check current enrollment
    const currentMembers = await ClassMember.count({
      where: { classId: id },
      transaction: t,
    });

    if (currentMembers + student_ids.length > classExists.capacity) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: `Kapasitas kelas tidak mencukupi. Tersisa ${classExists.capacity - currentMembers} slot, mencoba menambah ${student_ids.length} siswa`,
      });
    }

    // Verify all students exist
    const students = await Student.findAll({
      where: { studentId: student_ids },
      attributes: ["studentId"],
      transaction: t,
    });

    if (students.length !== student_ids.length) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Beberapa student ID tidak valid",
      });
    }

    // Check for duplicate enrollments
    const existingMembers = await ClassMember.findAll({
      where: {
        classId: id,
        studentId: student_ids,
      },
      transaction: t,
    });

    if (existingMembers.length > 0) {
      await t.rollback();
      const duplicateIds = existingMembers.map((m) => m.studentId);
      return res.status(400).json({
        success: false,
        message: "Beberapa siswa sudah terdaftar di kelas ini",
        duplicateStudentIds: duplicateIds,
      });
    }

    // Bulk create class members
    const membersData = validEnrollments.map((enrollmentData) => ({
      classId: id,
      studentId: enrollmentData.studentId,
      enrollmentId: enrollmentData.enrollmentId,
    }));

    const newMembers = await ClassMember.bulkCreate(membersData, {
      transaction: t,
    });

    await t.commit();

    return res.status(201).json({
      success: true,
      message: `Berhasil menambahkan ${newMembers.length} siswa ke kelas`,
      data: {
        classId: id,
        addedStudents: newMembers.length,
        totalMembers: currentMembers + newMembers.length,
        capacity: classExists.capacity,
      },
    });
  } catch (error) {
    await t.rollback();
    console.error("Add students to class error:", error);

    // Handle foreign key constraint errors
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        success: false,
        message:
          "Referensi data tidak valid (Class atau Student tidak ditemukan)",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan siswa ke kelas",
      error: error.message,
    });
  }
};

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;

        const classData = await Class.findByPk(id);
        if (!classData) {
            return res.status(404).json({
                success: false,
                message: "Kelas tidak ditemukan"
            });
        }

        const memberCount = await ClassMember.count({ where: { classId: id } });
        if (memberCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Gagal menghapus. Kelas masih memiliki ${memberCount} siswa terdaftar.`
            });
        }

        const scheduleCount = await ClassSchedule.count({ where: { classId: id } });
        if (scheduleCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Gagal menghapus. Kelas masih memiliki ${scheduleCount} jadwal aktif.`
            });
        }

        await classData.destroy();

        return res.status(200).json({
            success: true,
            message: "Kelas berhasil dihapus"
        });

    } catch (error) {
        console.error("Delete class error:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat menghapus kelas",
            error: error.message
        });
    }
};