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
// SET LOADING
export const setLoading = (bool) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_LOADING,
    payload: bool,
  });
};

//
// SELECT PRODUCT
export const getProductToDisplay = (product_id) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_LOADING,
    payload: true,
  });
  const response = await axios.get(
    `http://127.0.0.1:8000/product/${product_id}/`,
    {
      headers: {
        Sessionkey: window.sessionStorage.getItem("Sessionkey"),
        // Authorization: `Token ${window.sessionStorage.getItem(
        //   "Authorization"
        // )}`,
      },
    }
  );
  console.log("response.data", response.data);
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);

  dispatch({
    type: ActionTypes.SELECT_PRODUCT_TO_DISPLAY,
    payload: response.data,
  });
  dispatch({
    type: ActionTypes.SET_LOADING,
    payload: false,
  });
};
