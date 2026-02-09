import express from 'express';
import { 
    createRegistrationByAdmin, 
    getAllRegistrations, 
    getRegistrationById, 
    updateRegistrationStatus 
} from '../controllers/registrations.js';
import { authenticateToken } from '../middlewares/authToken.js';
import { authUserRole } from '../middlewares/authUserRole.js';

const router = express.Router();

// Admin-only routes
router.post('/admin', authenticateToken, authUserRole([1]), createRegistrationByAdmin);
router.get('/admin', authenticateToken, authUserRole([1]), getAllRegistrations);
router.get('/admin/:registrationId', authenticateToken, authUserRole([1]), getRegistrationById);
router.put('/admin/:registrationId/status', authenticateToken, authUserRole([1]), updateRegistrationStatus);

export default router;