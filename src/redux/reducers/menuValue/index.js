const initialMenuValueState = {
	menuDetails: 'payvice',
};

export const menuValueReducer = (state = initialMenuValueState, action) => {
	switch (action.type) {
		case 'SAVE_MENU_VALUE': {
			return {
				...state,
				menuDetails: action.menuDetails,
			};
		}
		default: {
			return state;
		}
	}
};

export default menuValueReducer;
