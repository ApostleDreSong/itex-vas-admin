const initialAuthState = {
	loadingState: false,
};

export const loadingStateReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case 'LOADINGSTATE': {
			return {
				...state,

				loadingState: action.loadingState,
			};
		}

		default: {
			return state;
		}
	}
};

export default loadingStateReducer;
