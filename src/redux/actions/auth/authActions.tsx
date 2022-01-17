import { SAVE_AUTH, LOG_OUT } from '../constants';
import { ReactNode } from 'react';

export const saveAuth = (authDetails: any) => {
	return {
		type: SAVE_AUTH,
		authDetails,
	};
};

export const logOut = () => ({ type: LOG_OUT });
