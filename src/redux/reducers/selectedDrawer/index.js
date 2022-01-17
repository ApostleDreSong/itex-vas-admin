const initialDrawerState = {
  drawer: "payvice",
};

export const drawerReducer = (state = initialDrawerState, action) => {
  switch (action.type) {
    case "SAVE_DRAWER": {
      return {
        ...state,
        drawer: action.drawerDetail,
      };
    }
    default: {
      return state;
    }
  }
};

export default drawerReducer;
