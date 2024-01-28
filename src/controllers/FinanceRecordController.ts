import { Request, Response } from 'express';
import FinanceRecord, { IFinanceRecord } from '../models/FinanceRecord';

export default class FinanceRecordController {
    static async getFinanceRecords(req: Request, res: Response) {
        try {
            const financeRecords = await FinanceRecord.find();
            res.json(financeRecords);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async getFinanceRecord(req: Request, res: Response) {
        try {
            const financeRecord: IFinanceRecord | null =
                await FinanceRecord.findById(req.params.id);
            if (financeRecord) {
                res.json(financeRecord);
            } else {
                res.status(404).json({
                    message: 'Registro financeiro não encontrado.',
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

    static async createFinanceRecord(req: Request, res: Response) {
        try {
            const financeRecord: IFinanceRecord = new FinanceRecord(req.body);
            await financeRecord.save();
            res.status(201).json(financeRecord);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async updateFinanceRecord(req: Request, res: Response) {
        try {
            const financeRecord: IFinanceRecord | null =
                await FinanceRecord.findByIdAndUpdate(
                    req.params.id,
                    req.body || {},
                    {
                        new: true,
                    },
                );
            if (financeRecord) {
                res.json(financeRecord);
            } else {
                res.status(404).json({
                    message: 'Registro financeiro não encontrado.',
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

    static async deleteFinanceRecord(req: Request, res: Response) {
        try {
            const financeRecord: IFinanceRecord | null =
                await FinanceRecord.findByIdAndDelete(req.params.id);
            if (financeRecord) {
                res.json({
                    message: 'Registro financeiro deletado com sucesso.',
                });
            } else {
                res.status(404).json({
                    message: 'Registro financeiro não encontrado.',
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
