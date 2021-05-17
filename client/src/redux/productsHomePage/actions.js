import axios from "axios";

import ActionTypes from "./constants";

// GET PRODUCTS (all in bulk)
export const getProducts = () => async (dispatch) => {
  const response = await axios.post("http://127.0.0.1:8000/product/all/", {
    session_key: window.sessionStorage.getItem("session_key"),
  });
  window.sessionStorage.setItem("session_key", response.data.session_key);
  console.log("getProducts response", response);
  dispatch({ type: ActionTypes.GET_PRODUCTS, payload: response.data.products });
};

//
// GET PRODUCTS FOR CATEGORY
export const getProductsForCategory = (category) => async (dispatch) => {
  const response = await axios.post(
    `http://127.0.0.1:8000/product/category/${category}/`,
    { session_key: window.sessionStorage.getItem("session_key") }
  );
  window.sessionStorage.setItem("session_key", response.data.session_key);
  console.log("getProductsForCategory response", response);
  dispatch({
    type: ActionTypes.GET_PRODUCTS_FOR_CATEGORY,
    payload: response.data.products,
  });
};

//
// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = () => async (dispatch) => {
  const response = await axios.post(
    `http://127.0.0.1:8000/product/all/bycategory`,
    { session_key: window.sessionStorage.getItem("session_key") }
  );
  window.sessionStorage.setItem("session_key", response.data.session_key);
  console.log("getProductsByCategory response", response);
  dispatch({
    type: ActionTypes.GET_PRODUCTS_BY_CATEGORY,
    payload: response.data.products,
  });
};

// an action is a func that takes an argument and returns an action,
// which is composed of payload and action type
