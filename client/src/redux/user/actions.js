import axios from "axios";

import ActionTypes from "./constants";

//
// GET SESSION KEY
export const getSessionKey = () => async (dispatch) => {
  const currentSessionKey = window.sessionStorage.getItem("session_key");
  console.log("currentSessionKey", currentSessionKey);
  const response = await axios.post(
    `http://127.0.0.1:8000/users/auth/session/`,
    { session_key: currentSessionKey }
  );
  console.log("getSessionKey    ", response.data.session_key);
  window.sessionStorage.setItem("session_key", response.data.session_key);
  dispatch({
    type: ActionTypes.GET_SESSION_KEY,
    payload: response.data,
  });
};

// an action is a func that takes an argument and returns an action,
// which is composed of payload and action type
