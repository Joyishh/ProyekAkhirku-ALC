import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Student from "./studentModel.js";
import Package from "./packageModel.js";

const { DataTypes } = Sequelize;

const StudentEnrollment = db.define('StudentEnrollment', {
    enrollmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'enrollment_id'
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'student_id',
        references: {
            model: 'students',
            key: 'student_id'
        }
    },
    packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'package_id',
        references: {
            model: 'packages',
            key: 'package_id'
        }
    },
    enrollmentDate: {
        type: DataTypes.DATEONLY, // Menggunakan DATE (YYYY-MM-DD) sesuai DBML
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'enrollment_date' // Nama kolom di database kamu
    },
    status: {
        type: DataTypes.ENUM('pending_payment', 'pending_admin_approval', 'aktif', 'selesai', 'dibatalkan'),
        allowNull: false,
        defaultValue: 'aktif',
        field: 'status'
    },
    totalPriceAgreed: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        field: 'total_price_agreed'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'notes'
    },
    isInitialPackage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_initial_package'
    }
}, {
    tableName: 'student_enrollments',
    timestamps: true,
    underscored: true
});

// Associations
StudentEnrollment.belongsTo(Student, {
    foreignKey: 'studentId',
    as: 'student'
});

StudentEnrollment.belongsTo(Package, {
    foreignKey: 'packageId',
    as: 'package'
});

Student.hasMany(StudentEnrollment, {
    foreignKey: 'studentId',
    as: 'enrollments'
});

export default StudentEnrollment;