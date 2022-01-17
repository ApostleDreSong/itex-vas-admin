import { CLOSE_TOAST, OPEN_AND_SET_TOAST_CONTENT } from "../constants";
import {CSSProperties, ReactNode} from "react";

export const closeToast = () => ({ type: CLOSE_TOAST });

export const openToastAndSetContent = ({ toastContent, toastStyles }: { toastContent: ReactNode, toastStyles?: CSSProperties }) => {
  return {
    type: OPEN_AND_SET_TOAST_CONTENT,
    toastContent,
    toastStyles,
  };
};
