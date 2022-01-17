import { SAVE_MENU } from "../constants";
import { ReactNode } from "react";

export const selectMenu = (menuDetail: string) => {

  return {
    type: SAVE_MENU,
    menuDetail,
  };
};
