import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from ".././components/footer/Footer";
import Cart from ".././components/cart/Cart";
import Products from ".././components/products/Products";

export default function Home({ products, cartItems }) {
  return (
    <>
      <Navbar />
      <h3>Home</h3>
      <Cart cartItems={cartItems} />
      <Products products={products} />
      <Footer />
    </>
  );
}
