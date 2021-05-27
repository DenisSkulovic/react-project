import axios from "axios";

import ActionTypes from "./constants";

//
// SET COLLAPSE ALL
export const setCollapseAll = () => async (dispatch) => {
  console.log("setCollapseAll");
  dispatch({
    type: ActionTypes.SET_COLLAPSE_ALL,
    payload: true,
  });
  dispatch({
    type: ActionTypes.SET_OPEN_ALL,
    payload: false,
  });
  setTimeout(() => {
    dispatch({
      type: ActionTypes.SET_COLLAPSE_ALL,
      payload: false,
    });
  }, 500);
};

//
// SET OPEN ALL
export const setOpenAll = () => async (dispatch) => {
  console.log("setOpenAll");
  dispatch({
    type: ActionTypes.SET_OPEN_ALL,
    payload: true,
  });
  dispatch({
    type: ActionTypes.SET_COLLAPSE_ALL,
    payload: false,
  });
  setTimeout(() => {
    dispatch({
      type: ActionTypes.SET_OPEN_ALL,
      payload: false,
    });
  }, 500);
};
