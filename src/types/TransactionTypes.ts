export default interface TransactionTypes {
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
