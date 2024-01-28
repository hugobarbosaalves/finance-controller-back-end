import { Request, Response } from 'express';
import Board, { IBoard } from '../models/Board';

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

    static async createBoard(req: Request, res: Response) {
        try {
            const board: IBoard = new Board(req.body);
            await board.save();
            res.status(201).json(board);
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
