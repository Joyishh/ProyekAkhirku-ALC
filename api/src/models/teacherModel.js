import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Teacher = db.define('Teacher', {
    teacherId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'teacher_id'
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
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'phone'
    },
    specialization: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'specialization'
    }
}, {
    tableName: 'teachers',
    timestamps: true,
    underscored: true
});

// Define associations
Teacher.associate = (models) => {
    // Teacher belongs to User
    Teacher.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });
};

export default Teacher;