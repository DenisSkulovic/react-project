import React, { useEffect } from "react";
import "./HomeProducts.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HomeCarousel from "./HomeCarousel";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { makeSelectProducts } from "../../redux/productsHomePage/selectors";

import { getProductsByCategory } from "../../redux/productsHomePage/actions";

export default function Products() {
  const dispatch = useDispatch();

  const productsData = useSelector(makeSelectProducts);

  useEffect(() => {
    dispatch(getProductsByCategory());
  }, []);

  return (
    <div className="products">
      <h3>Products</h3>
      {productsData &&
        Object.keys(productsData.products).map((key, i) => {
          return <HomeCarousel key={i} products={productsData.products[key]} />;
        })}
    </div>
  );
}
