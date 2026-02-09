import express from 'express';
import { register, loginUser, logoutUser, me } from '../controllers/auth.js';
import { authenticateToken } from '../middlewares/authToken.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', register);

router.delete('/logout', authenticateToken, logoutUser);
router.get('/me', authenticateToken, me);

export default router;