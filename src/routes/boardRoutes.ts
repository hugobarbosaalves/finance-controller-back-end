import { Router } from 'express';
import BoardController from '../controllers/BoardController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, (req, res) => {
    BoardController.getBoards(req, res);
});
router.get('/byEmail/:email', authenticate, (req, res): void => {
    BoardController.getBoardsByEmail(req, res);
});
router.get('/:id', authenticate, (req, res): void => {
    BoardController.getBoard(req, res);
});
router.post('/', authenticate, (req, res): void => {
    BoardController.createBoard(req, res);
});
router.put('/:id', authenticate, (req, res): void => {
    BoardController.updateBoard(req, res);
});
router.delete('/:id', authenticate, (req, res): void => {
    BoardController.deleteBoard(req, res);
});

export default router;
