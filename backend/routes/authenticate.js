import authenticateController from '../controllers/authenticate.js';
import { Router } from 'express';
const router = Router();

router.post('/login', authenticateController.postLogin);

export default router;