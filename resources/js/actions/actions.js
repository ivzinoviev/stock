import { post } from 'axios';
import { SUBMIT_URL } from '../constants/routes';
import { RESET_STOCK_DATA, SET_STOCK_DATA } from '../constants/appActions';

export const submitForm = (values, { setErrors }) => (dispatch) => {
  const request = post(`${location.origin}${SUBMIT_URL}`, values)
    .then(({ data }) => {
      dispatch({
        type: SET_STOCK_DATA,
        data,
      });
    })
    .catch(({ response }) => {
      if (response && response.data) {
        setErrors(response.data.errors);
      }
    });
};

export const resetStockData = () => (dispatch) => {
  dispatch({
    type: RESET_STOCK_DATA,
  });
};
