import generalController from '../controllers/general.js';
import { Router } from 'express';
const router = Router();

router.get('/', generalController.getIndex);

export default router;