import axios from "axios";

import ActionTypes from "./constants";

//
// GET PRODUCTS FOR CATEGORY
export const getProductsForCategory = (category) => async (dispatch) => {
  const response = await axios.post(
    `http://127.0.0.1:8000/product/category/${category}/`,
    { session_key: window.sessionStorage.getItem("session_key") }
  );
  window.sessionStorage.setItem("session_key", response.data.session_key);
  dispatch({
    type: ActionTypes.GET_PRODUCTS_FOR_CATEGORY,
    payload: response.data.products,
  });
};

//
// SET CATEGORY
export const setCategory = (category) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_CATEGORY,
    payload: category,
  });
};

//
// GET CATEGORIES
export const getCategories = () => async (dispatch) => {
  const response = await axios.post(`http://127.0.0.1:8000/category/all/`, {
    session_key: window.sessionStorage.getItem("session_key"),
  });
  window.sessionStorage.setItem("session_key", response.data.session_key);
  dispatch({
    type: ActionTypes.GET_CATEGORIES,
    payload: response.data.categories,
  });
};
// an action is a func that takes an argument and returns an action,
// which is composed of payload and action type
