import express from 'express'
import { updatePackageItem, deletePackageItem } from '../controllers/packageItems.js';
import { authUserRole } from '../middlewares/authUserRole.js';
import { authenticateToken } from '../middlewares/authToken.js';

const route = express.Router()

route.put('/admin/:packageItemId', authenticateToken, authUserRole([1]), updatePackageItem)
route.delete('/admin/:packageItemId', authenticateToken, authUserRole([1]), deletePackageItem)

export default route