import { Sequelize } from "sequelize"
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Package = db.define("Package", {
    packageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'package_id'
    },
    packageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'package_name'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    basePrice: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0.00,
        field: 'base_price'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
    }
},{
    modelName: 'Package',
    tableName: 'packages',
    timestamps: true,
    underscored: true,
})

Package.associate = function(models) {
    Package.hasMany(models.PackageItem, {
        foreignKey: 'packageId',
        as: 'packageItems'
    });
};

export default Package;