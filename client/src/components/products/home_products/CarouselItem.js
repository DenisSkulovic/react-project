import React from "react";
import "./CarouselItem.scss";

export default function CarouselItem({
  id,
  image,
  name,
  unit,
  unit_price,
  category,
}) {
  return (
    <div className="carousel-item">
      <div className="top-part">
        <div className="category">{category.name}</div>
      </div>
      <div className="bottom-part">
        <div className="image-wrapper">
          <div className="image-div">
            <img src={image} alt={name.toLowerCase().replace(/ /g, "")} />
          </div>
        </div>
        <div className="details">
          <div className="title">{name}</div>
          <div className="price">
            ${unit_price} / {unit}
          </div>
        </div>
      </div>
    </div>
  );
}
