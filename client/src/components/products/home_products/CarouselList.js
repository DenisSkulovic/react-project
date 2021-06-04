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
    dispatch(getProductsByCategory(10));
  }, []);

  return (
    <div className="carousel-list">
      <div className="products">
        {productsData &&
          Object.keys(productsData.products).map((category, i) => {
            return (
              <Carousel
                key={i}
                category={category}
                products={productsData.products[category]}
              />
            );
          })}
      </div>
    </div>
  );
}
