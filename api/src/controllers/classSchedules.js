import ClassSchedule from '../models/classScheduleModel.js';
import Subject from '../models/subjectModel.js';
import Teacher from '../models/teacherModel.js';
import Class from '../models/classModel.js';

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await ClassSchedule.findAll({
      include: [
        {
          model: Subject,
          as: 'subject'
        },
        {
          model: Teacher,
          as: 'teacher'
        },
        {
          model: Class,
          as: 'class',
          attributes: ['classId', 'className']
        }
      ],
      order: [['dayOfWeek', 'ASC'], ['startTime', 'ASC']]
    });
    
    res.status(200).json({ 
      success: true,
      data: schedules 
    });
  } catch (error) {
    console.error('Error fetching all schedules:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching schedules', 
      error: error.message 
    });
  }
};

export const getSchedulesByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    
    const schedules = await ClassSchedule.findAll({
      where: { class_id: classId },
      include: [
        {
          model: Subject,
          as: 'subject'
        },
        {
          model: Teacher,
          as: 'teacher'
        }
      ]
    });
    
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching class schedules', 
      error: error.message 
    });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const { class_id, subject_id, teacher_id, day_of_week, start_time, end_time } = req.body;
    
    // Validate required fields
    if (!class_id || !subject_id || !teacher_id || !day_of_week || !start_time || !end_time) {
      return res.status(400).json({ 
        message: 'All fields are required: class_id, subject_id, teacher_id, day_of_week, start_time, end_time' 
      });
    }
    
    const newSchedule = await ClassSchedule.create({
      class_id,
      subject_id,
      teacher_id,
      day_of_week,
      start_time,
      end_time
    });
    
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating schedule', 
      error: error.message 
    });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    
    const schedule = await ClassSchedule.findByPk(id);
    
    if (!schedule) {
      return res.status(404).json({ 
        message: 'Schedule not found' 
      });
    }
    
    await schedule.destroy();
    
    res.status(200).json({ 
      message: 'Schedule deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting schedule', 
      error: error.message 
    });
  }
};