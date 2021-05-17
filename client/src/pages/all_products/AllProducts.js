import React from "react";
import Categories from "../../components/products/Categories";
import ProductsListByCategory from "../../components/products/ProductsListByCategory";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import Container from "react-bootstrap/Container";
import "./AllProducts.scss";

export default function AllProducts() {
  return (
    <>
      <Navbar className={"fixed with-cart"} />
      <div className="main with-navbar with-cart">
        <Cart />
        <Container>
          <div className="products-wrapper">
            <div className="all-products-wrapper">
              <Categories />
              <ProductsListByCategory />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
