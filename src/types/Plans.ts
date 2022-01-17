import { PlanDetail } from "./PlanDetails";

export interface Plans {
  data: PlanDetail[];
  status: string;
  status_code: string;
  message: string;
}
