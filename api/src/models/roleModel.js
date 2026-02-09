import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Role = db.define("Role", {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'role_id'
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'role_name'
    }
}, {
    modelName: 'Role',
    tableName: 'roles',
    timestamps: true,
    underscored: true,
});

export default Role;