import axios from "axios";

import ActionTypes from "./constants";

//
// GET PRODUCTS FOR CATEGORY
export const getProductsForCategory =
  (category, order_by, page, page_size = 15) =>
  async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_LOADING,
      payload: true,
    });
    const response = await axios.get(
      `http://127.0.0.1:8000/product/category/${category}/?page=${page}&order_by=${order_by}&page_size=${page_size}`,
      {
        headers: {
          Sessionkey: window.sessionStorage.getItem("Sessionkey"),
          // Authorization: `Token ${window.sessionStorage.getItem(
          //   "Authorization"
          // )}`,
        },
      }
    );
    window.sessionStorage.setItem(
      "Sessionkey",
      response.data.results.session_key
    );
    dispatch({
      type: ActionTypes.GET_PRODUCTS_FOR_CATEGORY,
      payload: response.data,
    });
    dispatch({
      type: ActionTypes.SET_LOADING,
      payload: false,
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
// SET LOADING
export const setLoading = (bool) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_LOADING,
    payload: bool,
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
