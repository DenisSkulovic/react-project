import React from "react";

export default function CartItem({
  id,
  name,
  price,
  category,
  image,
  quantity,
}) {
  return (
    <div className="cart-item">
      <div className="top-part">
        <div className="category">{category}</div>
      </div>
      <div className="bottom-part">
        <div className="image-wrapper">
          <div className="cls">close</div>
          <div className="image">{image}</div>
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

// when hover on quantity, it should change from showing units,
// to showing a plus and minus mini-menu that would send axios stuff to server

// when hover on image, the close button should appear
