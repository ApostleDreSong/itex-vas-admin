export default interface ReferralTypes {
	id: number | string;
	date_joined: string;
	referred_by: string;
	balance: number;
	earnings: number;
	status: string;
	avatar_user: string;
	avatar_referred_user: string;
}
