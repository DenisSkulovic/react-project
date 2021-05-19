import React from "react";
import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Carousel.scss'

import CarouselItem from "./CarouselItem";

export default function Carousel({ products, category }) {
  console.log("products", products);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

  return (
    <>
      { products && <div className="carousel-wrapper">

        <div className="category-name">
          {category}
        </div>
        <div className="carousel">
          <ReactCarousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            showDots={true}
            renderDotsOutside={true}
            responsive={responsive}
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
              return <CarouselItem key={prod.id} {...prod} />
            })
            }
          </ReactCarousel>
        </div>
      </div>}
    </>);
}
