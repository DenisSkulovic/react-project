import axios from "axios";

import ActionTypes from "./constants";

//
// GET CART
export const getCart = () => async (dispatch) => {
  const response = await axios.get(`http://127.0.0.1:8000/cart/`, {
    headers: {
      Sessionkey: window.sessionStorage.getItem("Sessionkey"),
      // Authorization: `Token ${window.sessionStorage.getItem("Authorization")}`,
    },
  });
  console.log("response.data", response.data);
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);

  const total = response.data.cart_items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  dispatch({
    type: ActionTypes.GET_CART,
    payload: response.data.cart_items,
  });
  dispatch({
    type: ActionTypes.CALC_CART_TOTAL,
    payload: total,
  });
};

//
// ADD REMOVE CART ITEM
export const addRemoveCartItem = (item_id, quantity) => async (dispatch) => {
  let change;
  if (quantity < 0) {
    change = "remove";
    quantity = -quantity;
  } else if (quantity >= 0) {
    change = "add";
  }
  const response = await axios.get(
    `http://127.0.0.1:8000/cart/change/${change}/${item_id}/${quantity}`,
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

  const total = response.data.cart_items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  dispatch({
    type: ActionTypes.ADD_REMOVE_CART_ITEM,
    payload: response.data.cart_items,
  });
  dispatch({
    type: ActionTypes.CALC_CART_TOTAL,
    payload: total,
  });
};
