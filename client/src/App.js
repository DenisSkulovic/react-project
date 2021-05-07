import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import About from "./pages/About";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Checkout from "./pages/Checkout";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";

function App() {
  const products = [
    {
      image: "https://pngimg.com/uploads/apple/apple_PNG12405.png",
      name: "Red Apfel",
      price: 3.5,
      category: "fruits",
      id: 123456789,
      quantity: 1,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Orange orange",
      price: 3.69,
      category: "fruits",
      id: 987654321,
      quantity: 2,
    },
  ];

  const cartItems = [
    {
      image: "https://pngimg.com/uploads/apple/apple_PNG12405.png",
      name: "Red Apfel",
      price: 3.5,
      category: "fruits",
      id: 123456789,
      quantity: 1,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Orange orange",
      price: 3.69,
      category: "fruits",
      id: 987654321,
      quantity: 2,
    },
  ];

  // const [cart, setCart] = useState([])

  // const getCartJSON = async (userID) => {
  //   let response = await axios({
  //     method: "get",
  //     url: "/cart",
  //     data: {
  //       userID: userID,
  //     },
  //   });
  //   let json = await response.json();
  //   setCart(json);
  // };

  // useEffect(()=>{
  //   const cart = await getCartJSON();
  // })

  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home products={products} cartItems={cartItems} />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
