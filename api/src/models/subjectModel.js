import { Sequelize } from "sequelize"
import db from '../config/database.js'

const { DataTypes } = Sequelize

const Subject = db.define("subjects", {
    subjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'subject_id' 
    },
    subjectName: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,     
      field: 'subject_name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {               
    modelName: 'Subject',     
    tableName: 'subjects',     
    underscored: true,        
  });

export default Subject