import { Request, Response } from 'express';
import FinanceSession, { IFinanceSession } from '../models/FinanceSession';

export default class FinanceSessionController {
    static async getFinanceSessions(req: Request, res: Response) {
        try {
            const financeSessions: IFinanceSession[] =
                await FinanceSession.find();
            res.json(financeSessions);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async getFinanceSession(req: Request, res: Response) {
        try {
            const financeSession: IFinanceSession | null =
                await FinanceSession.findById(req.params.id);
            if (financeSession) {
                res.json(financeSession);
            } else {
                res.status(404).json({
                    message: 'Sessão financeira não encontrada.',
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

    static async createFinanceSession(req: Request, res: Response) {
        try {
            const financeSession: IFinanceSession = new FinanceSession(
                req.body,
            );
            await financeSession.save();
            res.status(201).json(financeSession);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async updateFinanceSession(req: Request, res: Response) {
        try {
            const financeSession: IFinanceSession | null =
                await FinanceSession.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true },
                );
            if (financeSession) {
                res.json(financeSession);
            } else {
                res.status(404).json({
                    message: 'Sessão financeira não encontrada.',
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

    static async deleteFinanceSession(req: Request, res: Response) {
        try {
            const financeSession: IFinanceSession | null =
                await FinanceSession.findByIdAndDelete(req.params.id);
            if (financeSession) {
                res.json({
                    message: 'Sessão financeira deletada com sucesso.',
                });
            } else {
                res.status(404).json({
                    message: 'Sessão financeira não encontrada.',
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
