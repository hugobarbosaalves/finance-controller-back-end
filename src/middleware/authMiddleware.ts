import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = 'E345136C6D34281EEF43B89B4E2168887B0FFB647B055738ED952455DA3D3E66';

interface AuthenticatedRequest extends Request {
    user?: object | JwtPayload; // Defina o tipo de user conforme necessário
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação ausente.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] }) as any;
        console.log('decoded -->', decoded);
        req.user = decoded;
        next();
    } catch (error: any) {
        console.error('Erro ao verificar token:', error.message);
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

export { authenticate };
