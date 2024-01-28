import { Router } from 'express';
import FinanceSessionController from '../controllers/FinanceSessionController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, FinanceSessionController.getFinanceSessions);
router.get('/:id', authenticate, FinanceSessionController.getFinanceSession);
router.post('/', authenticate, FinanceSessionController.createFinanceSession);
router.put('/:id', authenticate, FinanceSessionController.updateFinanceSession);
router.delete(
    '/:id',
    authenticate,
    FinanceSessionController.deleteFinanceSession,
);

export default router;
