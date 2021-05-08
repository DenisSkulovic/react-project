import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import HomeProducts from "../../components/products/HomeProducts";
import "./Home.scss";
import Container from "react-bootstrap/Container";

export default function Home({ products, cartItems }) {
  return (
    <>
      <Navbar className={"fixed with-cart"} />
      <div className="main with-navbar with-cart">
        <Container>
          <div className="cart-wrapper">
            <Cart cartItems={cartItems} />
          </div>
          <div className="products-wrapper">
            <HomeProducts products={products} />
          </div>
        </Container>
      </div>
    </>
  );
}
