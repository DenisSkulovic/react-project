import React from "react";
import Categories from "../../components/products/all_products/Categories";
import OrderBy from "../../components/products/all_products/OrderBy";
import ProductsListByCategory from "../../components/products/all_products/ProductsListByCategory";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import Container from "react-bootstrap/Container";
import "./AllProducts.scss";
import ProductDetailFixedOverlay from "../../components/products/fixed_product_detail/ProductDetailFixedOverlay";

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
              <OrderBy />
              <ProductsListByCategory />
            </div>
          </div>
        </Container>
      </div>
      <ProductDetailFixedOverlay />
    </>
  );
}
