import axios from "axios";

import ActionTypes from "./constants";

//
// GET CART
export const getCart = () => async (dispatch) => {
  const response = await axios.post(`http://127.0.0.1:8000/cart/`, {
    session_key: window.sessionStorage.getItem("session_key"),
  });
  window.sessionStorage.setItem("session_key", response.data.session_key);

  const total = response.data.cart_items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  dispatch({
    type: ActionTypes.GET_CART,
    payload: response.data.cart_items,
  });
  dispatch({
    type: ActionTypes.GET_CART_TOTAL,
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
  const response = await axios.post(
    `http://127.0.0.1:8000/cart/change/${change}/${item_id}/${quantity}`,
    {
      session_key: window.sessionStorage.getItem("session_key"),
    }
  );
  window.sessionStorage.setItem("session_key", response.data.session_key);

  const total = response.data.cart_items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  dispatch({
    type: ActionTypes.ADD_REMOVE_CART_ITEM,
    payload: response.data.cart_items,
  });
  dispatch({
    type: ActionTypes.GET_CART_TOTAL,
    payload: total,
  });
};

// an action is a func that takes an argument and returns an action,
// which is composed of payload and action type
