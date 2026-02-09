import express from 'express';
import { getAdminDashboardStats } from '../controllers/dashboard.js';
import { authenticateToken } from '../middlewares/authToken.js';
import { authUserRole } from '../middlewares/authUserRole.js';

const router = express.Router();

// Admin Dashboard Routes
router.get('/admin/stats', authenticateToken, authUserRole([1]), getAdminDashboardStats);

// TODO: Add future dashboard routes
// router.get('/teacher/stats', authenticateToken, authUserRole([2]), getTeacherDashboardStats);
// router.get('/student/stats', authenticateToken, authUserRole([3]), getStudentDashboardStats);

export default router;