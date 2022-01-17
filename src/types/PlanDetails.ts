export interface PlanDetail {
  id: number;
  name: string;
  description: string;
  principal_amount: number;
  monthly_payable: number;
  interest: number;
  duration: number;
  payment_date: string;
  eligible_amount: number;
}
