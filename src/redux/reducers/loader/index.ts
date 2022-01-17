import { CSSProperties, ReactNode } from "react";
import { CLOSE_LOADER, OPEN_LOADER } from "../../actions/constants";

interface LoaderActionInterface {
  type:string;
}

interface LoaderInterface {
  LoaderOpened: boolean;
}

const initialLoaderState: LoaderInterface = {
  LoaderOpened: false,
};

const loaderReducer = (state = initialLoaderState, action: LoaderActionInterface) => {
  switch (action.type) {
    case CLOSE_LOADER: {
      return { ...state, LoaderOpened: false };
    }
    case OPEN_LOADER: {
      return { ...state, LoaderOpened: true };
    }
    default: {
      return state;
    }
  }
};

export default loaderReducer;
