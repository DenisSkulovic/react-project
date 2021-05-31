import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveCartItem } from "../../../redux/cart/actions";
import "./AddRemoveButtons.scss";
import { makeSelect_Cart_cartBubbleClass } from "../../../redux/cart/selectors";
import { openCart } from "../../../utils";

export default function AddRemoveButtons({ id }) {
  const dispatch = useDispatch();
  const cartBubbleClassSelector = useSelector(makeSelect_Cart_cartBubbleClass);

  const handleAddRemoveBtnClick = (q) => {
    dispatch(addRemoveCartItem(id, q));
    dispatch(openCart(cartBubbleClassSelector));
  };

  return (
    <div
      className="add-remove-buttons-wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <ButtonGroup>
        <Button
          block
          onClick={() => {
            handleAddRemoveBtnClick(-1);
          }}
          variant="light"
          className="add-remove-btn"
        >
          -
        </Button>
        <Button
          block
          onClick={() => {
            handleAddRemoveBtnClick(1);
          }}
          variant="light"
          className="add-remove-btn"
        >
          +
        </Button>
      </ButtonGroup>
    </div>
  );
}
