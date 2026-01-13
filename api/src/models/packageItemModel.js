import { Sequelize } from "sequelize"
import db from '../config/database.js'

const { DataTypes } = Sequelize

const PackageItem = db.define('PackageItem', {
    packageItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'package_item_id'
    },
    numberOfMeets: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'number_of_meets'
    },
    levelSpecific: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'level_specific'
    }
}, {
    modelName: 'PackageItem',
    tableName: 'package_items',
    timestamps: true,
    underscored: true,
});

PackageItem.associate = function(models) {
    PackageItem.belongsTo(models.Package, {
        foreignKey: 'packageId',
        as: 'package',
        onDelete: 'CASCADE'
    });
    PackageItem.belongsTo(models.Subject, {
        foreignKey: 'subjectId',
        as: 'subjectDetails',
        onDelete: 'RESTRICT'
    });
};

export default PackageItem;