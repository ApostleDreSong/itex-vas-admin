import { TRANSACTIONDETAIL } from '../constants';
import { ReactNode } from 'react';

export const saveTransactionDetail = (transactionDetails: any) => {
	return {
		type: TRANSACTIONDETAIL,
		transactionDetails,
	};
};
