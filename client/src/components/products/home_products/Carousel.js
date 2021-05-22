import React from "react";
import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.scss";

import CarouselItem from "./CarouselItem";

export default function Carousel({ products, category }) {
  console.log("products", products);
  const responsive = {
    8: {
      breakpoint: { max: 4000, min: 2800 },
      items: 10,
    },
    7: {
      breakpoint: { max: 2800, min: 2500 },
      items: 9,
    },
    6: {
      breakpoint: { max: 2500, min: 1650 },
      items: 8,
    },
    5: {
      breakpoint: { max: 1650, min: 1450 },
      items: 7,
    },
    4: {
      breakpoint: { max: 1450, min: 1250 },
      items: 6,
    },
    3: {
      breakpoint: { max: 1250, min: 1100 },
      items: 5,
    },
    2: {
      breakpoint: { max: 1100, min: 950 },
      items: 4,
    },
    1: {
      breakpoint: { max: 950, min: 800 },
      items: 3,
    },
    0: {
      breakpoint: { max: 800, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      {products && (
        <div className="carousel-wrapper">
          <div className="category-name">{category}</div>
          <div className="carousel">
            <ReactCarousel
              responsive={responsive}
              swipeable={false}
              draggable={false}
              showDots={true}
              renderDotsOutside={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {products.map((prod) => {
                return <CarouselItem key={prod.id} {...prod} />;
              })}
            </ReactCarousel>
          </div>
        </div>
      )}
    </>
  );
}
