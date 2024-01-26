import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const secretKey = 'E345136C6D34281EEF43B89B4E2168887B0FFB647B055738ED952455DA3D3E66';

const signUp = async (req: Request, res: Response) => {
    // Implemente a lógica de registro de usuário aqui
};

const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Encontrar usuário pelo e-mail
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // Gerar token JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
            expiresIn: '1h', // Expira em 1 hora
        });

        // Enviar o token no corpo da resposta
        res.json({ token });
    } catch (error: any) {
        console.error('Erro ao fazer login:', error.message);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export { signUp, signIn };