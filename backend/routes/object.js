import objectController from '../controllers/object.js';
import { Router } from 'express';
const router = Router();

router.post('/admin/object/add', objectController.postAddObject);

export default router;