import express from 'express';
import { 
  getSchedulesByClass, 
  createSchedule, 
  deleteSchedule 
} from '../controllers/classSchedules.js';

const router = express.Router();

router.get('/class/:classId', getSchedulesByClass);
router.post('/', createSchedule);
router.delete('/:id', deleteSchedule);

export default router;