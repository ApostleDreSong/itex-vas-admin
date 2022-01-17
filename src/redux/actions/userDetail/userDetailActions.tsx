import { USERDETAIL } from '../constants';
import { ReactNode } from 'react';

export const saveUserDetail = (userDetails: any) => {
	return {
		type: USERDETAIL,
		userDetails,
	};
};
