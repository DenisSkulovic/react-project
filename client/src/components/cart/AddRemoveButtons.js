import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addRemoveCartItem } from "../../redux/cart/actions";
import "./AddRemoveButtons.scss";

export default function AddRemoveButtons({ id, hover, checkout }) {
  const dispatch = useDispatch();

  const handleAddRemoveBtnClick = (q) => {
    dispatch(addRemoveCartItem(id, q));
  };

  return (
    <div
      className={`add-remove-buttons-wrapper ${
        hover && !checkout ? "hover" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <ButtonGroup>
        <Button
          onClick={() => {
            handleAddRemoveBtnClick(-1);
          }}
          variant="light"
        >
          -1
        </Button>
        <Button
          onClick={() => {
            handleAddRemoveBtnClick(1);
          }}
          variant="light"
        >
          +1
        </Button>
      </ButtonGroup>
    </div>
  );
}
