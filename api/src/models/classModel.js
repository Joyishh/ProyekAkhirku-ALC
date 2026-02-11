import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Class = db.define('Class', {
    classId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'class_id'
    },
    packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'package_id',
        references: {
            model: 'packages',
            key: 'packageId'
        }
    },
    className: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'class_name'
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
        field: 'capacity'
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'active',
        field: 'status'
    }
}, {
    tableName: 'classes',
    timestamps: true,
    underscored: true
});

// Define associations (will be called after all models are loaded)
Class.associate = (models) => {
    // Class belongs to Package
    Class.belongsTo(models.Package, {
        foreignKey: 'packageId',
        as: 'package'
    });

    // Class has many ClassSchedule
    Class.hasMany(models.ClassSchedule, {
        foreignKey: 'classId',
        as: 'schedules'
    });

    // Class has many ClassMember
    Class.hasMany(models.ClassMember, {
        foreignKey: 'classId',
        as: 'members'
    });
};

export default Class;