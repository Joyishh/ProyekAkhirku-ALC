import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js"; // Pastikan import ini ada untuk relasi
import Packages from "./packageModel.js"; // Pastikan import ini ada untuk relasi

const { DataTypes } = Sequelize;

const Registration = db.define("Registration", {
    registrationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'registration_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Pastikan nama tabel di database lowercase 'users'
            key: 'user_id'
        },
        field: 'user_id'
    },
    studentFullname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'student_fullname' // SESUAI DBML
    },
    studentDateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'student_date_of_birth'
    },
    studentGender: {
        type: DataTypes.STRING(1), // Cukup 1 karakter (L/P)
        allowNull: false,
        validate: {
            isIn: [['L', 'P', 'Laki-laki', 'Perempuan']] // Validasi tambahan
        },
        field: 'student_gender' // SESUAI DBML
    },
    studentAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'student_address' // SESUAI DBML
    },
    studentClassLevel: {
        type: DataTypes.STRING(100),
        allowNull: true, // Boleh null dulu kalau di form belum ada
        field: 'student_class_level'
    },
    parentName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'parent_name'
    },
    parentPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'parent_phone'
    },
    selectedPackageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'packages',
            key: 'package_id'
        },
        field: 'selected_package_id'
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'payment_method' // MENAMPUNG DATA DARI DROPDOWN UI
    },
    applicationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'application_date' 
    },
    status: {
        type: DataTypes.ENUM('pending_review', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending_review',
        field: 'status'
    },
    adminNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'admin_notes'
    }
}, {
    tableName: 'registrations',
    freezeTableName: true,
    timestamps: true, // Ini akan membuat created_at dan updated_at otomatis
    underscored: true, // Mengubah camelCase di kode jadi snake_case di DB (createdAt -> created_at)
});

// Relasi didefinisikan di sini atau di file index models
Users.hasOne(Registration, { foreignKey: 'userId' });
Registration.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

Packages.hasMany(Registration, { foreignKey: 'selectedPackageId' });
Registration.belongsTo(Packages, { foreignKey: 'selectedPackageId', as: 'package' });

export default Registration;