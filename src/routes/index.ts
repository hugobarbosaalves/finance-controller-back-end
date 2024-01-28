import { Router } from 'express';
import authRoutes from './authRoutes';
import boardRoutes from './boardRoutes';
import financeRecordRoutes from './financeRecordRoutes';
import financeSessionRoutes from './financeSessionRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/boards', boardRoutes);
router.use('/financeSessions', financeSessionRoutes);
router.use('/financeRecord', financeRecordRoutes);
router.use('/user', userRoutes);

export default router;
