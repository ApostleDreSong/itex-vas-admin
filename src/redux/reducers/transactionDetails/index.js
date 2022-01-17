const initialAuthState = {
	transactionDetails: {
		data: {
			page: {
				total: 0,
				size: 0,
				total_page: 0,
				current_page: 0,
				previous_page: 0,
				next_page: 0,
				today_total: 0.0,
				all_time_total: 0.0,
				percent_change: 0.0,
				today_date: '',
			},
			items: [
				{
					id: 0,
					batch_id: 0,
					agent_id: 0,
					wallet_id: 0,
					product_id: 0,
					product: '',
					amount: 0,
					fee: 0.0,
					currency_id: 0,
					rate_used: 0,
					status_id: 0,
					status: null,
					transaction_reference: '',
					payment_reference: '',
					currency: '',
					agent_email: '',
					payment_response_code: '00',
					payment_response_message: '',
					narration: null,
					wallet_name: '',
					direction: '',
					date_created: '',
					date_updated: '',
				},
			],
		},
		status: '',
		status_code: '',
		message: '',
	},
};

export const transactionDetailReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case 'TRANSACTIONDETAIL': {
			return {
				...state,

				transactionDetails: { ...action.transactionDetails },
			};
		}

		default: {
			return state;
		}
	}
};

export default transactionDetailReducer;
