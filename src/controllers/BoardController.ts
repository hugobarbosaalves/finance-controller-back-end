import { Request, Response } from 'express';
import Board, { IBoard, IUserInBoard } from '../models/Board';

export default class BoardController {
    static async getBoards(req: Request, res: Response) {
        try {
            const boards: IBoard[] = await Board.find();
            res.json(boards);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async getBoard(req: Request, res: Response) {
        try {
            const board: IBoard | null = await Board.findById(req.params.id);
            if (board) {
                res.json(board);
            } else {
                res.status(404).json({
                    message: 'Quadro não encontrado.',
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

    static async getBoardsByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;

            if (!email) {
                return res.status(400).json({
                    message: 'Informe o email.',
                    codeStatus: 400,
                });
            }

            const boards: IBoard[] = await Board.find({ 'users.email': email });

            if (boards.length > 0) {
                res.json(boards);
            } else {
                res.status(404).json({
                    message: 'Nenhum quadro encontrado para o email fornecido.',
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

    static async createBoard(req: Request, res: Response) {
        try {
            const users: IUserInBoard = req.body.users;

            if (!users) {
                return res.status(400).json({
                    message: 'O campo "users" é obrigatório.',
                    codeStatus: 400,
                });
            }

            if (!req.body.title) {
                return res.status(400).json({
                    message: 'O campo "title" é obrigatório.',
                    codeStatus: 400,
                });
            }

            const financeSessionsData = [
                {
                    title: 'Rendas Fixas',
                    financeRecords: [],
                    sumOperation: true,
                },
                {
                    title: 'Rendas Variáveis',
                    financeRecords: [],
                    sumOperation: true,
                },
                {
                    title: 'Despesas Fixas',
                    financeRecords: [],
                    sumOperation: false,
                },
                {
                    title: 'Despesas Variáveis',
                    financeRecords: [],
                    sumOperation: false,
                },
            ];

            const month = {
                january: financeSessionsData,
                february: financeSessionsData,
                march: financeSessionsData,
                april: financeSessionsData,
                may: financeSessionsData,
                june: financeSessionsData,
                july: financeSessionsData,
                august: financeSessionsData,
                september: financeSessionsData,
                october: financeSessionsData,
                november: financeSessionsData,
                december: financeSessionsData,
            };

            const year = {
                year: new Date().getFullYear(),
                months: month,
            };

            const newBoard = new Board({
                createdAt: new Date(),
                updatedAt: new Date(),
                title: req.body.title,
                enabled: true,
                users: req.body.users,
                years: [year],
            });

            const savedBoard = await newBoard.save();

            res.status(201).send(savedBoard);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                codeStatus: 500,
            });
        }
    }

    static async updateBoard(req: Request, res: Response) {
        try {
            const board: IBoard | null = await Board.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            if (board) {
                res.json(board);
            } else {
                res.status(404).json({
                    message: 'Quadro não encontrado.',
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

    static async deleteBoard(req: Request, res: Response) {
        try {
            const board: IBoard | null = await Board.findByIdAndDelete(
                req.params.id,
            );
            if (board) {
                res.json({ message: 'Quadro deletado com sucesso.' });
            } else {
                res.status(404).json({
                    message: 'Quadro não encontrado.',
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
