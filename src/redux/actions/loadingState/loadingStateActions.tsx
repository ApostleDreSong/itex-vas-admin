import { LOADINGSTATE } from '../constants';
import { ReactNode } from 'react';

export const saveLoading = (loadingState: boolean) => {
	return {
		type: LOADINGSTATE,
		loadingState,
	};
};
