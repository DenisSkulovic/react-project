import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AllProducts from "./pages/all_products/AllProducts";

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
      id: 1,
      quantity: 1,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Orange orange",
      price: 3.69,
      category: "fruits",
      id: 2,
      quantity: 2,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Red carrot",
      price: 3.69,
      category: "vegetables",
      id: 3,
      quantity: 2,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Pink tomato",
      price: 3.69,
      category: "vegetables",
      id: 4,
      quantity: 2,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Green cheese",
      price: 3.69,
      category: "dairy",
      id: 5,
      quantity: 2,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Blue milk",
      price: 3.69,
      category: "dairy",
      id: 6,
      quantity: 2,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Green cheese",
      price: 3.69,
      category: "dairy",
      id: 7,
      quantity: 20000,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Blue milk",
      price: 3.69,
      category: "dairy",
      id: 8,
      quantity: 200,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Green cheese",
      price: 3.69,
      category: "dairy",
      id: 9,
      quantity: 20,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Blue milk",
      price: 3.69,
      category: "dairy",
      id: 10,
      quantity: 2000,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Green cheese",
      price: 3.69,
      category: "dairy",
      id: 11,
      quantity: 200,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Blue milk",
      price: 3.69,
      category: "dairy",
      id: 12,
      quantity: 20,
    },
  ];

  const cartItems = [
    {
      image: "https://pngimg.com/uploads/apple/apple_PNG12405.png",
      name: "Red Apfel",
      price: 3.5,
      category: "fruits",
      id: 7,
      quantity: 1,
    },
    {
      image:
        "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
      name: "Orange orange",
      price: 3.69,
      category: "fruits",
      id: 8,
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
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/all">
          <AllProducts products={products} cartItems={cartItems} />
        </Route>
        <Route path="/">
          <Home products={products} cartItems={cartItems} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
