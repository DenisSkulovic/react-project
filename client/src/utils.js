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
