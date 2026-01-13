import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/adminProductController.js';
import { authenticateToken } from '../middlewares/authToken.js';
import authUserRole from '../middlewares/authUserRole.js';

const router = express.Router();

router.post('/admin/', authenticateToken, authUserRole([1]), createProduct);
router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProductById);
router.put('/admin/:id', authenticateToken, authUserRole([1]), updateProduct);
router.delete('/admin/:id', authenticateToken, authUserRole([1]), deleteProduct);

export default router;