const initialProductsState = {
  products: [],
};

export const productReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS": {
      return {
        ...state,
        products: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default productReducer;
