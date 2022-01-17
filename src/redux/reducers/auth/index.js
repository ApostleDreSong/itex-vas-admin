const initialAuthState = {
	auth: {
		data: {
			token: {
				access_token: '',
			},
			admin: {
				first_name: '',
				last_name: '',
				email_address: '',
				mobile_number: '',
				role: '',
				permission: '',
				avatar: '',
				date_created: '',
			},
			modules: [
				{
					name: '',
					descriptions: '',
					id: 0,
					date_created: '',
					date_updated: null,
				},
			],
		},
		status: '',
		status_code: '',
		message: '',
	},
};

export const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case 'SAVE_AUTH': {
			return {
				...state,

				auth: { ...action.authDetails },
			};
		}
		case 'LOG_OUT': {
			return {
				...state,
				auth: {},
			};
		}
		default: {
			return state;
		}
	}
};

export default authReducer;
