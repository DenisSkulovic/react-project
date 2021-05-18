import axios from "axios";

import ActionTypes from "./constants";

//
// OPEN PRODUCT DETAIL
export const openProductDetail = () => (dispatch) => {
  dispatch({
    type: ActionTypes.OPEN_DETAIL,
  });
};

//
// CLOSE PRODUCT DETAIL
export const closeProductDetail = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CLOSE_DETAIL,
  });
};

//
// SET QUANTITY INPUT VALUE
export const setQuantityInputValue = (val) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_QUANTITY_INPUT_VALUE,
    payload: val > 0 ? val : 0,
  });
};

//
// SELECT PRODUCT
export const getProductToDisplay = (product_id) => async (dispatch) => {
  const response = await axios.post(
    `http://127.0.0.1:8000/product/${product_id}/`,
    {
      session_key: window.sessionStorage.getItem("session_key"),
    }
  );
  window.sessionStorage.setItem("session_key", response.data.session_key);

  console.log("response.data", response.data);
  dispatch({
    type: ActionTypes.SELECT_PRODUCT_TO_DISPLAY,
    payload: response.data,
  });
};
