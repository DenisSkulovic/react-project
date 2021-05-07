import React from "react";
import CarouselItem from "./CarouselItem";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function HomeCarousel({ products }) {
  const handleDragStart = (e) => e.preventDefault();
  const items = products.map((prod) => {
    return <CarouselItem key={prod.id} {...prod} />;
  });
  const responsive = {
    0: {
      items: 1,
    },
    1024: {
      items: 3,
    },
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite={true}
        items={items}
        onDragStart={handleDragStart}
        responsive={responsive}
        controlsStrategy={"alternate"}
        autoWidth={true}
      />
    </div>
  );
}
