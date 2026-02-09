import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Student from "./studentModel.js";

const { DataTypes } = Sequelize;

const StudentParent = db.define('StudentParent', {
    parentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'parent_data_id'
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'student_id',
        references: {
            model: 'students',
            key: 'student_id'
        }
    },
    parentName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'fullname'
    },
    parentPhone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'phone'
    }
}, {
    tableName: 'student_parents',
    timestamps: true,
    underscored: true
});

// Associations
StudentParent.belongsTo(Student, {
    foreignKey: 'studentId',
    as: 'student'
});

Student.hasOne(StudentParent, {
    foreignKey: 'studentId',
    as: 'parent'
});

export default StudentParent;