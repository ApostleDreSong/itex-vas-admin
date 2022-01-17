import {  SAVE_MENU_VALUE } from '../constants';
import { ReactNode } from 'react';

export const saveMenuValue = (menuDetails: any) => {
	return {
		type: SAVE_MENU_VALUE,
		menuDetails,
	};
};

