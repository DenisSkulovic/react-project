import React from "react";

export default function CartItem({ id, price, product, quantity }) {
  return (
    <div className="cart-item-wrapper">
      <div className="cart-item">
        <div className="top-part">
          <div className="category">{product.category.name}</div>
        </div>
        <div className="bottom-part">
          <div className="image-wrapper">
            <div className="cls">close</div>
            <div className="image-div">
              <img
                src={product.image}
                alt={product.name.toLowerCase().replace(/ /g, "")}
              />
            </div>
          </div>
          <div className="details">
            <div className="title">{product.name}</div>
            <div className="price">{price}</div>
            <div className="quantity">{quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// when hover on quantity, it should change from showing units,
// to showing a plus and minus mini-menu that would send axios stuff to server

// when hover on image, the close button should appear
