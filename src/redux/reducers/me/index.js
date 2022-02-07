const initialAuthState = {
	me: {
		notifications: null,
		token: null,
		user: {
			id: 0,
			first_name: '',
			last_name: '',
			email_address: '',
			role_id: 0,
			role: '',
			status: '',
			avatar: null,
		},
		id: '',
		merchant_details: {
			total: 0,
			merchants: [
				{
					id: 0,
					name: '',
					mobile_number: null,
					address: null,
					status: '',
					logo: null,
					wallet_balance: 0,
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
