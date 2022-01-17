import { SAVE_PLAN } from "../constants";
import { ReactNode } from "react";
import { PlanDetail } from "../../../types/PlanDetails";

export const savePlan = (planDetail: PlanDetail) => {
  return {
    type: SAVE_PLAN,
    planDetail,
  };
};
