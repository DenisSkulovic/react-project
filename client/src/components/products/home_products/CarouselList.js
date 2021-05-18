import React, { useEffect } from "react";
import "./CarouselList.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectProducts } from "../../../redux/productsHomePage/selectors";
import { getProductsByCategory } from "../../../redux/productsHomePage/actions";

export default function CarouselList() {
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
          return <Carousel key={i} products={productsData.products[key]} />;
        })}
    </div>
  );
}
