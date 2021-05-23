import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addRemoveCartItem } from "../../../redux/cart/actions";
import "./AddRemoveButtons.scss";

export default function AddRemoveButtons({ id }) {
  const dispatch = useDispatch();

  const handleAddRemoveBtnClick = (q) => {
    dispatch(addRemoveCartItem(id, q));
  };

  return (
    <div
      className="add-remove-buttons-wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <ButtonGroup block>
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
