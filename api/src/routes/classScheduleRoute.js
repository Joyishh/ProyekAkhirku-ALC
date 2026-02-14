import express from 'express';
import { 
  getAllSchedules,
  getSchedulesByClass, 
  createSchedule, 
  deleteSchedule 
} from '../controllers/classSchedules.js';

const router = express.Router();

router.get('/', getAllSchedules);
router.get('/class/:classId', getSchedulesByClass);
router.post('/', createSchedule);
router.delete('/:id', deleteSchedule);

export default router;