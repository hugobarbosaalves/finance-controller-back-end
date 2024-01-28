import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

export default class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const user: IUser | null = await User.findById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'Usuário não encontrado.',
                    codeStatus: 404,
                });
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const user: IUser = new User(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const user: IUser | null = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'Usuário não encontrado.',
                    codeStatus: 404,
                });
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const user: IUser | null = await User.findByIdAndDelete(
                req.params.id,
            );
            if (user) {
                res.json({ message: 'Usuário deletado com sucesso.' });
            } else {
                res.status(404).json({
                    message: 'Usuário não encontrado.',
                    codeStatus: 404,
                });
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }
}
