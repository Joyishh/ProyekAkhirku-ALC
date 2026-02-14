import express from 'express';
import { 
    getAllClasses, 
    createClass, 
    getClassById, 
    updateClass,
    addStudentsToClass,
    deleteClass,
    getAvailableStudents,
} from '../controllers/class.js';
import { authenticateToken } from '../middlewares/authToken.js';
import { authUserRole } from '../middlewares/authUserRole.js';

const router = express.Router();

// Get all classes (Admin & Teacher access)
router.get('/', authenticateToken, authUserRole([1, 2]), getAllClasses);

// Create new class (Admin only)
router.post('/', authenticateToken, authUserRole([1]), createClass);

// Get class details by ID (Admin & Teacher access)
router.get('/:id', authenticateToken, authUserRole([1, 2]), getClassById);

// Update class (Admin only)
router.put('/:id', authenticateToken, authUserRole([1]), updateClass);

// Add students to class (Admin only)
router.post('/:id/members', authenticateToken, authUserRole([1]), addStudentsToClass);
router.delete('/:id', authenticateToken, authUserRole([1]), deleteClass);
router.get('/:id/candidates', authenticateToken, authUserRole([1]), getAvailableStudents);

export default router;