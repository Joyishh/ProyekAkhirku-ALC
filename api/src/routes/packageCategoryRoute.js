import express from 'express';
import { createPackageCategory, getAllPackageCategories, getPackageCategoryById, updatePackageCategory, deletePackageCategory } from '../controllers/adminPackageController.js';
import { authenticateToken } from '../middlewares/authToken.js';
import authUserRole from '../middlewares/authUserRole.js';

const router = express.Router();

router.post('/admin/', authenticateToken, authUserRole([1]), createPackageCategory);
router.get('/', authenticateToken, getAllPackageCategories);
router.get('/:id', authenticateToken, getPackageCategoryById);
router.put('/admin/:id', authenticateToken, authUserRole([1]), updatePackageCategory);
router.delete('/admin/:id', authenticateToken, authUserRole([1]), deletePackageCategory);

export default router;