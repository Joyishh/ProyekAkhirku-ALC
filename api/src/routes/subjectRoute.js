import { createSubject, getAllSubjects, getSubjectsById, editSubject, deleteSubject } from "../controllers/subjects.js";
import { authenticateToken } from "../middlewares/authToken.js";
import { authUserRole } from "../middlewares/authUserRole.js";
import express from 'express';

const router = express.Router()

router.post('/admin/', authenticateToken, authUserRole([1]), createSubject);
router.get('/', authenticateToken, getAllSubjects);
router.get('/:subjectId', authenticateToken, getSubjectsById);
router.put('/admin/:subjectId', authenticateToken, authUserRole([1]), editSubject);
router.delete('/admin/:subjectId', authenticateToken, authUserRole([1]), deleteSubject);

export default router;