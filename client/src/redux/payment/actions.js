import axios from "axios";

import ActionTypes from "./constants";

//
// GET CART
export const pay = (data) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_PROCESSING,
    payload: true,
  });
  const response = await axios.post(
    `http://127.0.0.1:8000/cart/pay/`,
    {
      ...data,
    },
    {
      headers: {
        Sessionkey: window.sessionStorage.getItem("Sessionkey"),
        Authorization: `Token ${window.sessionStorage.getItem(
          "Authorization"
        )}`,
      },
    }
  );
  console.log("response.data", response.data);
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);

  dispatch({
    type: ActionTypes.SET_PROCESSING,
    payload: false,
  });
};
