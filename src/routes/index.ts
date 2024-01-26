import { Router } from 'express';
import authRoutes from './authRoutes';
import financeRoutes from './financeRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/finance', financeRoutes);

export default router;
