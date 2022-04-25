import workController from '../controllers/work.js';
import { Router } from 'express';
const router = Router();

router.get('/works', workController.getWorks);

export default router;