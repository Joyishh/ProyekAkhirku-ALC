import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ClassMember = db.define('ClassMember', {
    memberId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'member_id'
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'class_id',
        references: {
            model: 'classes',
            key: 'class_id'
        }
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
    enrollmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'enrollment_id',
        references: {
            model: 'student_enrollments',
            key: 'enrollment_id'
        }
    }
}, {
    tableName: 'class_members',
    timestamps: true,
    underscored: true
});

// Define associations
ClassMember.associate = (models) => {
    // ClassMember belongs to Class
    ClassMember.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'class'
    });

    // ClassMember belongs to Student
    ClassMember.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
    });

    // ClassMember belongs to StudentEnrollment (optional)
    ClassMember.belongsTo(models.StudentEnrollment, {
        foreignKey: 'enrollmentId',
        as: 'enrollment'
    });
};

export default ClassMember;