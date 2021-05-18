import "./App.css";
import React, { useEffect } from "react";

// pages
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AllProducts from "./pages/all_products/AllProducts";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getSessionKey } from "./redux/user/actions";

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
    dispatch(getSessionKey());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/all" component={AllProducts} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
