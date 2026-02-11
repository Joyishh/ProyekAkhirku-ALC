import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ClassSchedule = db.define('ClassSchedule', {
    scheduleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'schedule_id'
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
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'subject_id',
        references: {
            model: 'subjects',
            key: 'subject_id'
        }
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'teacher_id',
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    dayOfWeek: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'day_of_week',
        validate: {
            isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
        }
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'start_time'
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'end_time'
    },
    locationOrRoom: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'location_or_room'
    }
}, {
    tableName: 'class_schedule',
    timestamps: true,
    underscored: true
});

// Define associations
ClassSchedule.associate = (models) => {
    // ClassSchedule belongs to Class
    ClassSchedule.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'class'
    });

    // ClassSchedule belongs to Subject
    ClassSchedule.belongsTo(models.Subject, {
        foreignKey: 'subjectId',
        as: 'subject'
    });

    // ClassSchedule belongs to User (Teacher)
    ClassSchedule.belongsTo(models.User, {
        foreignKey: 'teacherId',
        as: 'teacher'
    });
};

export default ClassSchedule;