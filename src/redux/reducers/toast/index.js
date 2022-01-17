import {
  CLOSE_TOAST,
  OPEN_AND_SET_TOAST_CONTENT,
} from "../../actions/constants";

const initialToastState = {
  toastContent: "",
  toastStyles: {
    backgroundColor: "green",
    fontWeight: 800,
    color: "white",
  },
  toastOpened: false,
};

const toastReducer = (state = initialToastState, action) => {
  switch (action.type) {
    case CLOSE_TOAST: {
      return { ...state, toastOpened: false };
    }
    case OPEN_AND_SET_TOAST_CONTENT: {
      return {
        ...state,
        toastOpened: true,
        toastContent: action.toastContent,
        toastStyles: { ...state.toastStyles, ...action.toastStyles },
      };
    }
    default: {
      return state;
    }
  }
};

export default toastReducer;
