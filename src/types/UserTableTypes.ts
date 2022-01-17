export interface UserTableTypes {
	id: number | string;
	first_name: string;
	last_name: string;
	mobile_number: number | string;
	email_address: string;
	status: string;
	avatar: null | string;
	role: string;
	address: null | string;
	city: null | string;
	state: null | string;
	password_tries: number;
	account_locked_until: null | string | number;
	date_account_locked: null | string | number;
	date_created: string;
	password_expires_in: null | string;
	pin_expires_in: null | string;
}

export interface ActivityApiTypes {
	page: {
		total: number | string;
		size: number | string;
		total_page: number | string;
		current_page: number | string;
		previous_page: number | string;
		next_page: number | string;
		today_total: number | string;
		all_time_total: number | string;
		percent_change: number | string;
		today_date: string;
	};
	items: [
		{
			id: number | string;
			batch_id: number | string;
			customer_id: number | string;
			wallet_id: number | string;
			product_id: number | string;
			product: string;
			amount: number;
			fee: number;
			currency_id: number;
			rate_used: number;
			status_id: number;
			status: string;
			transaction_reference: string;
			payment_reference: string;
			currency: string | number;
			customer_email: string;
			payment_response_code: string | number;
			payment_response_message: string;
			narration: string;
			wallet_name: string;
			direction: string;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface TransactionApiTypes {
	page: {
		total: number | string;
		size: number | string;
		total_page: number | string;
		current_page: number | string;
		previous_page: number | string;
		next_page: number | string;
		today_total: number | string;
		all_time_total: number | string;
		percent_change: number | string;
		today_date: string;
	};
	items: [
		{
			id: number | string;
			batch_id: number | string;
			customer_id: number | string;
			wallet_id: number | string;
			product_id: number | string;
			product: string;
			amount: number;
			fee: number;
			currency_id: number;
			rate_used: number;
			status_id: number;
			status: string;
			transaction_reference: string;
			payment_reference: string;
			currency: string | number;
			customer_email: string;
			payment_response_code: string | number;
			payment_response_message: string;
			narration: string;
			wallet_name: string;
			direction: string;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface TransactionDetailApiTypes {
	page: {
		total: Number;
		size: Number;
		total_page: Number;
		current_page: Number;
		previous_page: Number;
		next_page: Number;
		today_total: Number;
		all_time_total: Number;
		percent_change: Number;
		today_date: string | number;
	};
	items: [
		{
			id: Number;
			batch_id: Number;
			agent_id: Number;
			wallet_id: Number;
			product_id: Number;
			product: string;
			amount: Number;
			fee: Number;
			currency_id: Number;
			rate_used: Number;
			status_id: Number;
			status: null | String;
			transaction_reference: string;
			payment_reference: string;
			currency: string;
			agent_email: string;
			payment_response_code: Number | string;
			payment_response_message: string;
			narration: null | String;
			wallet_name: string;
			direction: string;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface ApiResTypes {
	page: {
		total: number | string;
		size: number | string;
		total_page: number | string;
		current_page: number | string;
		previous_page: number | string;
		next_page: number | string;
		today_total: number | string;
		all_time_total: number | string;
		percent_change: number | string;
		today_date: string;
	};
	items: [
		{
			id: number | string;
			first_name: string;
			last_name: string;
			mobile_number: string | number;
			email_address: string;
			status: string;
			avatar: null | string;
			role: string;
			address: null | string;
			city: null | string;
			state: null | string;
			password_tries: number;
			account_locked_until: null | string;
			date_account_locked: null | string;
			date_created: string;
			password_expires_in: null | string;
			pin_expires_in: null;
		}
	];
}

export interface UserProfApi {
	data: {
		id: number | string;
		first_name: string;
		last_name: string;
		mobile_number: string;
		email_address: string;
		status: string;
		avatar: null | string;
		role: string;
		address: null | string;
		city: null | string;
		state: null | string;
		password_tries: number | string;
		account_locked_until: null | string;
		date_account_locked: null | string;
		date_created: string;
		password_expires_in: null | string;
		pin_expires_in: null | string;
	};
	status: string;
	status_code: string;
	message: string;
}

export interface TransactionDProfApi {
	data: {
		id: number | string;
		first_name: string;
		last_name: string;
		mobile_number: string;
		email_address: string;
		status: string;
		avatar: null | string;
		role: string;
		address: null | string;
		city: null | string;
		state: null | string;
		password_tries: number | string;
		account_locked_until: null | string;
		date_account_locked: null | string;
		date_created: string;
		password_expires_in: null | string;
		pin_expires_in: null | string;
	};
	status: string;
	status_code: string;
	message: string;
}

export interface userProfileTransactionTypes {
	Id: number | string;
	date: string;
	type: string;
	amount: number;
	recipient: string;
	destination: string;
	device: string;
	status: string;
}

export interface activitysectionTypes {
	id: number | string;
	date: string;
	time: string;
	amount: number;
	avatar: null | string;
	status: string;
}

export interface earningsectionTypes {
	id: number | string;
	date: string;
	amount: number | string;
	merchant: string;
	service: string;
}

export interface vasActivityTypes {
	id: number | string;
	date: string;
	earnings: number | string;
	merchant: string;
	activity: string;
	commission: string;
}

export interface vasTransactionTypes {
	id: number | string;
	date: string;
	amount: number | string;
	merchant: string;
	provider: string;
	phone: number | string;
	network: string;
	payment_ref: number | string;
	status: string;
}

export interface vasServicesTypes {
	id: number | string;
	date_modified: string;
	date_added: string;
	title: string;
	description: string;
	provider: string;
	category: string;
	provider_fee: number | string;
}

export interface settingTypes {
	page: {
		total: number;
		size: number;
		total_page: number;
		current_page: number;
		previous_page: number;
		next_page: number;
		today_total: number;
		all_time_total: number;
		percent_change: number;
		today_date: string;
	};
	items: [
		{
			role: string;
			status_name: string;
			first_name: string;
			last_name: string;
			email_address: string;
			mobile_number: string;
			password: string;
			avatar: null | string;
			status: number;
			role_id: number;
			account_locked_until: null | string | number;
			date_locked: null | string | number;
			password_tries: number;
			id: number;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface approvalsTypes {
	id: number | string;
	action: string;
	user_email: string;
	created_by: string;
	date_created: null | string;
	time_created: string;
}

export interface userlistTypes {
	id: number | string;

	first_name: string;
	last_name: string;
	status: null | string;
	email: string;
}

export interface transactionWalletTypes {
	id: number | string;
	date: string;
	transaction_type: string;
	status: null | string;
	amount: number;
	balance: number;
}

export interface walletTopUpTypes {
	id: number | string;
	date: string;
	target: string | number;
	country: string;
	operator_name: string;
	amount: number;
	status: null | string;
}

export interface TopUpLogTypes {
	id: number | string;
	system_ref: string;
	customer_ref: string;
	operator_ref: string;
	time: string;
	target: number;
	country: string;
	operator_name: string;
	amount: number;
	status: null | string;
}

export interface mainTransactionTypes {
	id: number | string;
	transaction_ref: string;
	time: string;
	transaction_type: string;
	amount: number;
	balance: number;
	narration: string;
	description: string;
}

export interface dashboardTableTypes {
	id: number | string;
	amount: number | string;
	count: number | string;
	percentage: number;
	status: string;
}
