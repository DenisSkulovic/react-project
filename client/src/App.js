import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PrivateRoute, PublicRoute } from "./utils";

// pages
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import ChangePassword from "./pages/users/change_password/ChangePassword";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AllProducts from "./pages/all_products/AllProducts";
import PaymentHistory from "./pages/users/history/PaymentHistory";
import Page404 from "./pages/page404/Page404";
import { decideAuthStatus } from "./redux/user/actions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("Sessionkey", window.sessionStorage.getItem("Sessionkey"));
    dispatch(decideAuthStatus());
  });
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/account/history" component={PaymentHistory} />
        <PrivateRoute
          path="/account/change-password"
          component={ChangePassword}
        />
        <PrivateRoute path="/account" component={Users} />
        <PublicRoute path="/about" component={About} />
        <PublicRoute path="/checkout" component={Checkout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/all" component={AllProducts} />
        <PublicRoute exact path="/" component={Home} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
