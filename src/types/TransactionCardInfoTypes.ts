export default interface CardInfoTypes {
	data: {
		balance: number;
		previous_balance: number;
		volume: number;
		previous_volume: number;
		amount: number;
		previous_amount: number;
	};
	status: string;
	status_code: string | number;
	message: string;
}
