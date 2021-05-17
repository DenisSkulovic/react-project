import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import HomeProducts from "../../components/products/HomeProducts";
import "./Home.scss";
import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <>
      <Navbar className={"fixed with-cart"} />
      <div className="main with-navbar with-cart">
        <Container>
          <div className="cart-wrapper">
            <Cart />
          </div>
          <div className="products-wrapper">
            <HomeProducts />
          </div>
        </Container>
      </div>
    </>
  );
}
