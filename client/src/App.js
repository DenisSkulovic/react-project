import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// pages
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AllProducts from "./pages/all_products/AllProducts";
import PaymentHistory from "./pages/payment/PaymentHistory";
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
    console.log("Sessionkey", window.sessionStorage.getItem("Sessionkey"));
    dispatch(decideAuthStatus());
  });
  return (
    <Router>
      <Switch>
        <Route path="/history" component={PaymentHistory} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/all" component={AllProducts} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
