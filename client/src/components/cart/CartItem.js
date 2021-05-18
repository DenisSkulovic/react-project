import React, { useState } from "react";
import { addRemoveCartItem } from "../../redux/cart/actions";
import { useDispatch } from "react-redux";
import {
  getProductToDisplay,
  openProductDetail,
} from "../../redux/productDetail/actions";
import CloseBtn from "./CloseBtn";
import AddRemoveButtons from "./AddRemoveButtons";
import "./CartItem.scss";

export default function CartItem({ id, price, product, quantity }) {
  const dispatch = useDispatch();

  const [hoverBool, setHoverBool] = useState(false);
  const checkout =
    window.location.href.indexOf("checkout") !== -1 ? true : false;

  const handleRemove = () => {
    dispatch(addRemoveCartItem(product.id, -quantity));
  };

  const handleMouseEnter = () => {
    setHoverBool(true);
  };

  const handleMouseLeave = () => {
    setHoverBool(false);
  };

  const handleDetailsClick = () => {
    dispatch(openProductDetail());
    dispatch(getProductToDisplay(product.id));
  };
  return (
    <div
      className={`cart-item-wrapper ${hoverBool && !checkout ? "hover" : ""}`}
      onMouseLeave={() => handleMouseLeave()}
      onMouseEnter={() => handleMouseEnter()}
    >
      {hoverBool && !checkout && (
        <CloseBtn handleRemove={handleRemove}></CloseBtn>
      )}
      <div
        onClick={() => (checkout ? undefined : handleDetailsClick())}
        className="cart-item container"
      >
        <div className="top-part">
          <div className="category">{product.category.name}</div>
        </div>
        <div className="bottom-part">
          <div className="left-col">
            <div className="image-wrapper">
              <div className="image-div">
                <img
                  src={product.image}
                  alt={product.name.toLowerCase().replace(/ /g, "")}
                />
              </div>
            </div>
          </div>
          <div className="right-col">
            <div className="right-col-inner-wrapper">
              <div className="details-wrapper">
                <div className="details">
                  <div className="title">{product.name}</div>
                  <div className="price">{price}</div>
                  <div className="quantity">{quantity}</div>
                </div>
              </div>
              <AddRemoveButtons
                checkout={checkout}
                hover={hoverBool}
                id={product.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
