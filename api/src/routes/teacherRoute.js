import express from 'express';
import { 
    getAllTeachers, 
    createTeacher, 
    getTeacherById,
    updateTeacher
} from '../controllers/teachers.js';
import { authenticateToken } from '../middlewares/authToken.js';
import { authUserRole } from '../middlewares/authUserRole.js';

const router = express.Router();

// Get all teachers (Admin access)
router.get('/', authenticateToken, authUserRole([1]), getAllTeachers);

// Create new teacher (Admin only)
router.post('/', authenticateToken, authUserRole([1]), createTeacher);

// Get teacher details by ID (Admin access)
router.get('/:id', authenticateToken, authUserRole([1]), getTeacherById);

// Update teacher (Admin only)
router.put('/:id', authenticateToken, authUserRole([1]), updateTeacher);

export default router;