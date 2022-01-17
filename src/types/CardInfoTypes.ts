export default interface CardInfoTypes {
	data: {
		total_balance: number;
		total_user: number;
		total_today_user: number;
		customer_percent_change: number;
		total_transaction_amount: number;
		total_today_transaction_amount: number;
		transaction_percent_change: number;
		most_active_user: number;
		top_referral: number;
		inactive_people: number;
		top_earners: number;
		top_sender: number;
		high_balance_users: number;
	};
	status: string;
	status_code: number;
	message: string;
}
