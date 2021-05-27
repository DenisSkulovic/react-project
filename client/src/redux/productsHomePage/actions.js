import axios from "axios";

import ActionTypes from "./constants";

//
// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = (q) => async (dispatch) => {
  const response = await axios.get(
    `http://localhost:8000/product/all/bycategory/random/?q=${q}`,
    {
      headers: {
        Sessionkey: window.sessionStorage.getItem("Sessionkey"),
        // Authorization: `Token ${window.sessionStorage.getItem(
        //   "Authorization"
        // )}`,
      },
    }
  );
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);
  dispatch({
    type: ActionTypes.GET_PRODUCTS_BY_CATEGORY,
    payload: response.data.products,
  });
};

// an action is a func that takes an argument and returns an action,
// which is composed of payload and action type
