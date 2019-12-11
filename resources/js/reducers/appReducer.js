import {RESET_STOCK_DATA, SET_STOCK_DATA} from "../constants/appActions";

const initialState = {
  stockData: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STOCK_DATA:
      return {
        ...state,
        stockData: action.data,
      }
    case RESET_STOCK_DATA:
      return {
        ...state,
        stockData: null,
      }
    default:
      return state;
  }
};
