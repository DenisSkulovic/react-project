import React from "react";
import { addRemoveCartItem } from "../../redux/cart/actions";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

// redux
import { useDispatch } from "react-redux";

import { makeSelect_Cart_cartItems } from "../../redux/cart/selectors";

export default function AllProductsItem({
  id,
  category,
  image,
  name,
  unit_price,
  quantity,
}) {
  const cartSelector = useSelector(makeSelect_Cart_cartItems);

  const dispatch = useDispatch();
  const handleBtnClick = (q) => {
    dispatch(addRemoveCartItem(id, q));
  };

  return (
    <div className="all-products-item">
      <div className="image-wrapper">
        <img src={image} alt={name.toLowerCase().replace(/ /g, "")} />
      </div>
      <div className="details">
        <div className="title">{name}</div>
        <div className="price">{unit_price}</div>
        <div className="quantity-available">
          Available: {quantity < 100 ? quantity : ">100"}
        </div>
      </div>
      <ButtonGroup>
        <Button
          onClick={() => {
            handleBtnClick(-1);
          }}
          variant="secondary"
        >
          Remove 1
        </Button>
        <Button
          onClick={() => {
            handleBtnClick(1);
          }}
          variant="secondary"
        >
          Add 1
        </Button>
      </ButtonGroup>
    </div>
  );
}

// make quantity available wrap to something like "more than 10..." if its more than ten; show number if less;
