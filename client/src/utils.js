import { useHistory } from "react-router-dom";
import {
  // BrowserRouter as Router,
  // Switch,
  Redirect,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";
import { setCartClass, setCartBubbleClass } from "./redux/cart/actions";
import {
  makeSelect_Cart_cartClass,
  makeSelect_Cart_cartBubbleClass,
} from "./redux/cart/selectors";

export const isLoggedIn = () => {
  return window.sessionStorage.getItem("Authorization") ? true : false;
};

export const isLoginPage = () => {
  return window.location.href.indexOf("login") !== -1 ? true : false;
};

export const PublicRoute = ({ component, restricted, ...rest }) => {
  const history = useHistory();
  if (isLoginPage() && isLoggedIn()) {
    history.goBack();
  }
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} component={component} />
  );
};

export const PrivateRoute = ({ component, ...rest }) => {
  const history = useHistory();
  if (isLoginPage() && isLoggedIn()) {
    history.goBack();
  }
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} component={component} />
  );
};

export const openCart = (cartBubbleClassSelector) => (dispatch) => {
  if (cartBubbleClassSelector.cart_bubble_class === "cart-bubble-open") {
    dispatch(setCartBubbleClass("cart-bubble-closing"));
    dispatch(setCartClass("cart-opening"));
    setTimeout(() => {
      dispatch(setCartBubbleClass("cart-bubble-closed"));
      dispatch(setCartClass("cart-open"));
    }, 300);
  }
};

export const closeCart = (cartClassSelector) => (dispatch) => {
  if (cartClassSelector.cart_class === "cart-open") {
    dispatch(setCartBubbleClass("cart-bubble-opening"));
    dispatch(setCartClass("cart-closing"));
    setTimeout(() => {
      dispatch(setCartBubbleClass("cart-bubble-open"));
      dispatch(setCartClass("cart-closed"));
    }, 300);
  }
};
