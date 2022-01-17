import { SAVE_DRAWER } from "../constants";
import { ReactNode } from "react";


export const selectDrawer = (drawerDetail: string) => {
  return {
    type: SAVE_DRAWER,
    drawerDetail,
  };
};
