import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/rootReducer";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
