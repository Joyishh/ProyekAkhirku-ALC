import express from 'express'
import { createPackage, getAllPackages, getActivePackages, getPackageById, updatePackage, deletePackage } from '../controllers/packages.js'
import { createPackageItem, getPackageItemByPackageId } from '../controllers/packageItems.js'
import { authUserRole } from '../middlewares/authUserRole.js'
import { authenticateToken } from '../middlewares/authToken.js'

const router = express.Router();

router.post('/admin/', authenticateToken, authUserRole([1]), createPackage)
router.get('/', authenticateToken, getAllPackages)
router.get('/active', authenticateToken, getActivePackages)
router.get('/:packageId', authenticateToken, getPackageById)
router.put('/admin/:packageId', authenticateToken, authUserRole([1]), updatePackage)
router.delete('/admin/:packageId', authenticateToken, authUserRole([1]), deletePackage)

router.post('/admin/:packageId/items', authenticateToken, authUserRole([1]), createPackageItem)
router.get('/admin/:packageId/items', authenticateToken, authUserRole([1]), getPackageItemByPackageId)

export default router