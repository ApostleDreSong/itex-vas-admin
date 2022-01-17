import { CSSProperties, ReactNode } from "react";
import { CLOSE_MODAL, OPEN_AND_SET_MODAL_CONTENT } from "../../actions/constants";

interface ModalActionInterface {
  type:string;
  modalContent: ReactNode;
  modalStyles: CSSProperties
}

interface ModalInterface {
  modalOpened: boolean;
  modalContent: ReactNode;
  modalStyles: CSSProperties
}

const initialModalState: ModalInterface = {
  modalContent: "",
  modalStyles: {
    fontWeight: 800,
    color: 'white'
  },
  modalOpened: false,
};

const modalReducer = (state = initialModalState, action: ModalActionInterface) => {
  switch (action.type) {
    case CLOSE_MODAL: {
      return { ...state, modalOpened: false };
    }
    case OPEN_AND_SET_MODAL_CONTENT: {
      return {
        ...state,
        modalOpened: true,
        modalContent: action.modalContent,
        modalStyles: {...state.modalStyles,...action.modalStyles},
      };
    }
    default: {
      return state;
    }
  }
};

export default modalReducer;
