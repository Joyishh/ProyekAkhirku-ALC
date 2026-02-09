import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Student = db.define('Student', {
    studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'student_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    fullname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'fullname'
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'date_of_birth'
    },
    gender: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        field: 'gender',
        validate: {
            isIn: [['L', 'P']] // L = Laki-laki, P = Perempuan
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'address'
    },
    classLevel: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'class_level'
    }
}, {
    tableName: 'students',
    timestamps: true,
    underscored: true
});

// Associations
Student.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user'
});

export default Student;