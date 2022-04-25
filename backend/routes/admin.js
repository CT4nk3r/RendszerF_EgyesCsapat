import adminController from '../controllers/admin.js';
import { Router } from 'express';
const router = Router();

router.post('/admin/generate_users', adminController.postGenerateUsers);

router.post('/admin/add_repairer', adminController.postAddRepairer);

router.post('/admin/add_maintenance', adminController.postAddMaintenance);

export default router;