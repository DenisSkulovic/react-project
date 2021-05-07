import React from "react";
import "./HomeProducts.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HomeCarousel from "./HomeCarousel";

export default function Products({ products }) {
  const getUniqueCategories = (products) => {
    return Array.from(
      new Set(
        products.map((prod) => {
          return prod.category;
        })
      )
    );
  };
  const getProductsForCategory = (category) => {
    return products.filter((prod) => {
      return prod.category === category;
    });
  };

  const uniqueCategories = getUniqueCategories(products);

  return (
    <div className="products">
      <h3>Products</h3>
      {/* {uniqueCategories.map((category) => {
        return <HomeCarousel products={getProductsForCategory(category)} />;
      })} */}
      <HomeCarousel products={products} />
    </div>
  );
}
