import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, UserController.getUsers);
router.get('/:id', authenticate, UserController.getUser);
router.post('/', authenticate, UserController.createUser);
router.put('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);

export default router;
