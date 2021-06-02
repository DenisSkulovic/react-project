import React from "react";
import Categories from "../../components/products/all_products/Categories";
import OrderBy from "../../components/products/all_products/OrderBy";
import ProductsListByCategory from "../../components/products/all_products/ProductsListByCategory";
import Container from "react-bootstrap/Container";
import "./AllProducts.scss";
import ProductDetailFixedOverlay from "../../components/products/fixed_product_detail/ProductDetailFixedOverlay";

export default function AllProducts() {
  return (
    <>
      <div className="main with-navbar">
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
