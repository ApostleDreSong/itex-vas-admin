export interface PaymentPlans {
  breakdown: {
    amount: number;
    interest: number;
    payment_date: string;
    default_date: string;
  }[];
  id: number;
  name: string;
  description: string;
  principal_amount: number;
  interest: number;
  duration: number;
  payment_date: string;
}
