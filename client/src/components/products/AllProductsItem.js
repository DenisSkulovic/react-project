import React from "react";

export default function AllProductsItem({
  id,
  category,
  image,
  name,
  price,
  quantity,
}) {
  return (
    <div className="all-products-item">
      <div className="image-wrapper">
        <img src={image} alt={name.toLowerCase().replace(/ /g, "")} />
      </div>
      <div className="details">
        <div className="title">{name}</div>
        <div className="price">{price}</div>
        <div className="quantity-available">
          Available: {quantity < 100 ? quantity : ">100"}
        </div>
      </div>
    </div>
  );
}

// make quantity available wrap to something like "more than 10..." if its more than ten; show number if less;
