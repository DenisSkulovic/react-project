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
  alert(response.data.message);
  window.sessionStorage.setItem("Sessionkey", response.data["session_key"]);
  if (response.data.status === "success") {
    window.sessionStorage.setItem("Authorization", response.data["token"]);
    window.sessionStorage.setItem("Email", response.data.user);
    dispatch({
      type: ActionTypes.AUTHENTICATION_STATUS,
      payload: true,
    });
    dispatch({
      type: ActionTypes.SET_EMAIL,
      payload: window.sessionStorage.getItem("Email"),
    });
  } else {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("Email");
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
    dispatch({
      type: ActionTypes.SET_EMAIL,
      payload: "",
    });
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("Email");
    window.sessionStorage.setItem("Sessionkey", response.data["session_key"]);
  } catch (err) {
    console.error(err);
  }
};

//
// CHANGE PASSWORD
export const change_password =
  (email, old_password, new_password) => async (dispatch) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/users/account/change_password/`,
        {
          email: email,
          old_password: old_password,
          new_password: new_password,
        },
        {
          headers: {
            Sessionkey: window.sessionStorage.getItem("Sessionkey"),
            Authorization: `Token ${window.sessionStorage.getItem(
              "Authorization"
            )}`,
          },
        }
      );
      alert(`${response.data.message}`);
      console.log("response", response);
      window.sessionStorage.setItem("Sessionkey", response.data["session_key"]);
      if (response.data.status === "success") {
        window.sessionStorage.setItem("password_change_success", "true");
      }
    } catch (err) {
      console.error("err", err);
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
  alert(response.data.message);
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
