const initialAuthState = {
	auth: {
		notifications: [],
		token: {
			access_token: '',
		},
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
		status_code: 0,
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
				auth: {
					notifications: [],
					token: {
						access_token: '',
					},
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
					status_code: 0,
					message: '',
				},
			};
		}
		default: {
			return state;
		}
	}
};

export default authReducer;
