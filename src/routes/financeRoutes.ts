import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { User } from '../models/user';

const router = Router();

router.get('/users', authenticate, async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        console.error('Erro ao consultar usuários:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

export default router;
