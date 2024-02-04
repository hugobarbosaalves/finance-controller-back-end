import { IFinanceRecord } from './FinanceRecord';

interface IFinanceSession {
    title: string;
    sumOperation: boolean;
    financeRecords: IFinanceRecord[];
}

export { IFinanceSession };
