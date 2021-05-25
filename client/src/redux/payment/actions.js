import axios from "axios";

import ActionTypes from "./constants";
import CartActionTypes from "../cart/constants";

//
// PAY
export const pay = (data) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_PROCESSING,
    payload: true,
  });
  const auth = window.sessionStorage.getItem("Authorization");
  let headers = {
    Sessionkey: window.sessionStorage.getItem("Sessionkey"),
  };

  if (auth) {
    headers["Authoziration"] = `Token ${auth}`;
  }

  const response = await axios.post(
    `http://127.0.0.1:8000/cart/pay/`,
    {
      ...data,
    },
    {
      headers: headers,
    }
  );
  console.log("response.data", response.data);
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);
  dispatch({
    type: ActionTypes.SET_PAYMENT,
    payload: response.data,
  });
  dispatch({
    type: ActionTypes.SET_PROCESSING,
    payload: false,
  });
  dispatch({
    type: CartActionTypes.GET_CART,
    payload: [],
  });
  dispatch({
    type: CartActionTypes.CALC_CART_TOTAL,
    payload: 0,
  });
};

//
// GET PAYMENT HISTORY
export const getPaymentHistory = () => async (dispatch) => {
  const response = await axios.get(`http://127.0.0.1:8000/purchase/history/`, {
    headers: {
      Sessionkey: window.sessionStorage.getItem("Sessionkey"),
      Authorization: `Token ${window.sessionStorage.getItem("Authorization")}`,
    },
  });
  console.log("response.data", response.data);
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);
  dispatch({
    type: ActionTypes.SET_PAYMENT_HISTORY,
    payload: response.data.payments,
  });
};

//
// CLEAR PAYMENT
export const clearPaymentState = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_PAYMENT,
    payload: {},
  });
};
