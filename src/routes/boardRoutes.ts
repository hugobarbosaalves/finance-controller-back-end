import { Router } from 'express';
import BoardController from '../controllers/BoardController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, BoardController.getBoards);
router.get('/:id', authenticate, BoardController.getBoard);
router.post('/', authenticate, BoardController.createBoard);
router.put('/:id', authenticate, BoardController.updateBoard);
router.delete('/:id', authenticate, BoardController.deleteBoard);

export default router;
