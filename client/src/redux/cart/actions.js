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
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);

  const total = response.data.cart_items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  window.sessionStorage.setItem("cart_length", response.data.cart_items.length);

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
// CLEAR CART
export const clearCart = () => async (dispatch) => {
  console.log("clear cart");
  const response = await axios.get(`http://127.0.0.1:8000/cart/clear/`, {
    headers: {
      Sessionkey: window.sessionStorage.getItem("Sessionkey"),
      // Authorization: `Token ${window.sessionStorage.getItem("Authorization")}`,
    },
  });
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);

  const total = response.data.cart_items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  window.sessionStorage.setItem("cart_length", response.data.cart_items.length);

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
// SET CART CLASS
export const setCartClass = (cls) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_CART_CLASS,
    payload: cls,
  });
};

//
// SET CART BUBBLE CLASS
export const setCartBubbleClass = (cls) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_CART_BUBBLE_CLASS,
    payload: cls,
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
  window.sessionStorage.setItem("Sessionkey", response.data.session_key);

  const total = response.data.cart_items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  window.sessionStorage.setItem("cart_length", response.data.cart_items.length);

  dispatch({
    type: ActionTypes.ADD_REMOVE_CART_ITEM,
    payload: response.data.cart_items,
  });
  dispatch({
    type: ActionTypes.CALC_CART_TOTAL,
    payload: total,
  });
};
