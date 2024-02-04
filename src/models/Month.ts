import { IFinanceSession } from './FinanceSession';

interface IMonth {
    january: IFinanceSession[];
    february: IFinanceSession[];
    march: IFinanceSession[];
    april: IFinanceSession[];
    may: IFinanceSession[];
    june: IFinanceSession[];
    july: IFinanceSession[];
    august: IFinanceSession[];
    september: IFinanceSession[];
    october: IFinanceSession[];
    november: IFinanceSession[];
    december: IFinanceSession[];
}

export { IMonth };
