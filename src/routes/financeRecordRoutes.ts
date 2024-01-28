import { Router } from 'express';
import FinanceRecordController from '../controllers/FinanceRecordController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, FinanceRecordController.getFinanceRecords);
router.get('/:id', authenticate, FinanceRecordController.getFinanceRecord);
router.post('/', authenticate, FinanceRecordController.createFinanceRecord);
router.put('/:id', authenticate, FinanceRecordController.updateFinanceRecord);
router.delete(
    '/:id',
    authenticate,
    FinanceRecordController.deleteFinanceRecord,
);

export default router;
