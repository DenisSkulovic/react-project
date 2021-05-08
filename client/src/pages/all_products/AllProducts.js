import React, { useState } from "react";
import Categories from "../../components/products/Categories";
import ProductsListByCategory from "../../components/products/ProductsListByCategory";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import Container from "react-bootstrap/Container";
import "./AllProducts.scss";

export default function AllProducts({ products, cartItems }) {
  const [currentCategory, setCurrentCategory] = useState("all");

  const getUniqueCategories = () => {
    let unique_categories = Array.from(
      new Set(
        products.map((prod) => {
          return prod.category;
        })
      )
    );
    unique_categories.push("all");
    return unique_categories;
  };
  const uniqueCategories = getUniqueCategories();
  const getProductsForCategory = (category) => {
    if (category === "all") {
      return products;
    }
    return products.filter((prod) => {
      return prod.category === category;
    });
  };

  return (
    <>
      <Navbar className={"fixed with-cart"} />
      <div className="main with-navbar with-cart">
        <Cart cartItems={cartItems} />
        <Container>
          <div className="products-wrapper">
            <div className="all-products-wrapper">
              <Categories
                uniqueCategories={uniqueCategories}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
              />
              <ProductsListByCategory
                getProductsForCategory={getProductsForCategory}
                currentCategory={currentCategory}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
