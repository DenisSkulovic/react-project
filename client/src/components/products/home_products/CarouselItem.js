import React from "react";

export default function CarouselItem({
  id,
  category,
  image,
  name,
  price,
  quantity,
}) {
  return (
    <div className="carousel-item">
      <div className="top-part">
        <div className="category">{category}</div>
      </div>
      <div className="bottom-part">
        <div className="image-wrapper">
          <div className="image-div">
            <img src={image} alt={name.toLowerCase().replace(/ /g, "")} />
          </div>
        </div>
        <div className="details">
          <div className="title">{name}</div>
          <div className="price">{price}</div>
          <div className="quantity">{quantity}</div>
        </div>
      </div>
    </div>
  );
}
