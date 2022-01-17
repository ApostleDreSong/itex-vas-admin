import { ME } from '../constants';
import { ReactNode } from 'react';

export const saveMe = (meDetails: any) => {
	return {
		type: ME,
		meDetails,
	};
};
