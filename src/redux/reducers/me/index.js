const initialAuthState = {
	me: {
		data: {
			token: {
				access_token: null,
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
					id: 1,
					date_created: '',
					date_updated: null,
				},
				{
					name: '',
					descriptions: '',
					id: 2,
					date_created: '',
					date_updated: null,
				},
				{
					name: '',
					descriptions: '',
					id: 3,
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

export const meReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case 'ME': {
			return {
				...state,

				me: { ...action.meDetails },
			};
		}

		default: {
			return state;
		}
	}
};

export default meReducer;
