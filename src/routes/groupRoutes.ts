import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';

const router = Router();
const groupController = new GroupController();

router.get('/', groupController.getAllGroups);
router.delete('/remove-user', groupController.removeUserFromGroup);

export default router;