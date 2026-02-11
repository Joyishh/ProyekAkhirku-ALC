import express from 'express';
import { getAllStudents, getStudentDetail, updateStudent } from '../controllers/students.js';
import { authenticateToken } from '../middlewares/authToken.js';
import { authUserRole } from '../middlewares/authUserRole.js';

const router = express.Router();

router.get('/', authenticateToken, authUserRole([1, 2]), getAllStudents);
router.get('/:studentId', authenticateToken, authUserRole([1, 2]), getStudentDetail);
router.put('/:studentId', authenticateToken, authUserRole([1]), updateStudent);

export default router;