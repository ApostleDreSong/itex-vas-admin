import { CSSProperties, ReactNode } from "react";
import { CLOSE_MODAL, OPEN_AND_SET_MODAL_CONTENT } from "../constants";

interface ModalContentAndStyle {
  modalContent: ReactNode;
  modalStyles?: CSSProperties
}

export const closeModal = () => ({ type: CLOSE_MODAL });

export const openModalAndSetContent = ({ modalContent, modalStyles }: ModalContentAndStyle) => {
  return {
    type: OPEN_AND_SET_MODAL_CONTENT,
    modalContent,
    modalStyles,
  };
};
