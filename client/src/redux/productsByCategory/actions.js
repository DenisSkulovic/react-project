import axios from "axios";

import ActionTypes from "./constants";

//
// GET PRODUCTS FOR CATEGORY
export const getProductsForCategory =
  (category, order_by, page) => async (dispatch) => {
    const response = await axios.post(
      `http://127.0.0.1:8000/product/category/${category}/?page=${page}`,
      {
        session_key: window.sessionStorage.getItem("session_key"),
        order_by: order_by,
      }
    );
    window.sessionStorage.setItem("session_key", response.data.session_key);
    dispatch({
      type: ActionTypes.GET_PRODUCTS_FOR_CATEGORY,
      payload: response.data,
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
// SET PAGE
export const setPage = (page) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_PAGE,
    payload: page,
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

//
// SET ORDER BY
export const setOrderBy = (order_by) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_ORDER_BY,
    payload: order_by,
  });
};
