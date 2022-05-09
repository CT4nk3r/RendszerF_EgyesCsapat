import adminController from '../controllers/admin.js';
import { Router } from 'express';
const router = Router();

router.post('/admin/generate_users', adminController.postGenerateUsers);

router.post('/admin/add_repairer', adminController.postAddRepairer);

router.post('/admin/add_maintenance', adminController.postAddMaintenance);

router.post('/admin/add_category', adminController.postAddCategory);

router.post('/admin/accept_maintenance', adminController.postAcceptMaintenance);
router.post('/admin/decline_maintenance', adminController.postDeclineMaintenance);
router.post('/admin/done_maintenance', adminController.postDoneMaintenance);

export default router;