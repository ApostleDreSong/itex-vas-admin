import { combineReducers } from 'redux';

import navbar from './navbar/Index';
import toast from './toast/index';
import modal from './modal/index';
import loader from './loader/index';
import products from './products/index';
import planReducer from './plans/index';
import drawerReducer from './selectedDrawer/index';
import menuReducer from './selectedMenu/index';
import authReducer from './auth/index';
import meReducer from './me/index';
import menuValueReducer from './menuValue';
import userDetailReducer from './userDetails/index';
import transactionDetailReducer from './transactionDetails/index';
import loadingStateReducer from './loadingState/index';

const rootReducer = combineReducers({
	// customizer,
	// auth,
	// navbar,
	transactionDetailReducer,
	userDetailReducer,
	loadingStateReducer,
	planReducer,
	menuValueReducer,
	authReducer,
	meReducer,
	menuReducer,
	drawerReducer,
	toast,
	modal,
	loader,
	products,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
