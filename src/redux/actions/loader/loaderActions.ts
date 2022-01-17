import { CLOSE_LOADER, OPEN_LOADER } from "../constants";

export const closeLoader = () => ({ type: CLOSE_LOADER});
export const openLoader = () => ({ type: OPEN_LOADER });
