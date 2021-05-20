import axios from "axios";
import ActionTypes from "./constants";

//
// LOGIN
export const login = (email, password) => async (dispatch) => {
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
  console.log("response.data", response.data);
  window.sessionStorage.setItem("Sessionkey", response.data["session_key"]);
  if (response.data.status === "success") {
    window.sessionStorage.setItem("Authorization", response.data["token"]);
    window.sessionStorage.setItem("Email", response.data.user["email"]);
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
    const response = await axios.post(
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
    console.log("response", response);
    window.sessionStorage.setItem("Sessionkey", response.data["session_key"]);
  } catch (err) {
    console.error(err);
  } finally {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("Email");
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: false,
    });
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
  if (response.data.status === "success") {
    window.sessionStorage.setItem("Authorization", response.data["token"]);
    window.sessionStorage.setItem("Email", response.data.user["email"]);
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

export const decideAuthStatus = () => (dispatch) => {
  if (
    window.sessionStorage.getItem("Authorization") &&
    window.sessionStorage.getItem("Email")
  ) {
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: true,
    });
  } else {
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: false,
    });
  }
};
