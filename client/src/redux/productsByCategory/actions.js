import axios from "axios";

import ActionTypes from "./constants";

//
// GET PRODUCTS FOR CATEGORY
export const getProductsForCategory =
  (category, order_by, page) => async (dispatch) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/product/category/${category}/?page=${page}&order_by=${order_by}`,
      {
        headers: {
          Sessionkey: window.sessionStorage.getItem("Sessionkey"),
          // Authorization: `Token ${window.sessionStorage.getItem(
          //   "Authorization"
          // )}`,
        },
      }
    );
    console.log("response.data.results", response.data.results);
    window.sessionStorage.setItem(
      "Sessionkey",
      response.data.results.session_key
    );
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
  const response = await axios.get(`http://127.0.0.1:8000/category/all/`, {
    headers: {
      Sessionkey: window.sessionStorage.getItem("Sessionkey"),
      // Authorization: `Token ${window.sessionStorage.getItem("Authorization")}`,
    },
  });
  console.log("response.data", response.data);
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);
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
