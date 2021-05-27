import axios from "axios";
import ActionTypes from "./constants";

//
// LOGIN
export const login = (email, password) => async (dispatch) => {
  console.log("made request");
  const response = await axios.post(
    `http://127.0.0.1:8000/users/auth/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        Sessionkey: window.sessionStorage.getItem("Sessionkey"),
      },
    }
  );
  console.log("response", response);
  window.sessionStorage.setItem("Sessionkey", response.data["session_key"]);
  if (response.data.status === "success") {
    window.sessionStorage.setItem("Authorization", response.data["token"]);
    window.sessionStorage.setItem("Email", response.data.user);
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: true,
    });
  } else {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("Email");
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: false,
    });
  }
};

//
// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/users/auth/logout`,
      {
        headers: {
          Sessionkey: window.sessionStorage.getItem("Sessionkey"),
          Authorization: `Token ${window.sessionStorage.getItem(
            "Authorization"
          )}`,
        },
      }
    );
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: false,
    });
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("Email");
    window.sessionStorage.setItem("Sessionkey", response.data["session_key"]);
  } catch (err) {
    console.error(err);
  }
};

//
// REGISTER
export const register = (email, password) => async (dispatch) => {
  const response = await axios.post(
    `http://127.0.0.1:8000/users/auth/register`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        Sessionkey: window.sessionStorage.getItem("Sessionkey"),
      },
    }
  );
  console.log("response", response);
  if (response.data.status === "success") {
    window.sessionStorage.setItem("Authorization", response.data["token"]);
    window.sessionStorage.setItem("Email", response.data.user);
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: true,
    });
  } else {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("Email");
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: false,
    });
    alert(`${response.data.message}`);
  }
};

//
// DECIDE AUTH STATUS
export const decideAuthStatus = () => (dispatch) => {
  if (
    window.sessionStorage.getItem("Authorization") &&
    window.sessionStorage.getItem("Email")
  ) {
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: true,
    });
    dispatch({
      type: ActionTypes.SET_EMAIL,
      payload: window.sessionStorage.getItem("Email"),
    });
  } else {
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: false,
    });
    dispatch({
      type: ActionTypes.SET_EMAIL,
      payload: "",
    });
  }
};
