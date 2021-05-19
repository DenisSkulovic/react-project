import React from "react";
import { Button, Form } from "react-bootstrap";
import "./AddRemoveDiv.scss";

export default function AddRemoveDiv({
  handleInput,
  handleAddRemoveBtnClick,
  quantityInputValue_Selector,
}) {
  return (
    <div className="add-remove-wrapper">
      <div className="add-remove">
        <Button
          onClick={() => {
            handleAddRemoveBtnClick(-1);
          }}
          variant="light"
        >
          -1
      </Button>
        <Form.Control
          type="number"
          onInput={(e) => handleInput(e)}
          value={quantityInputValue_Selector.quantity_input_value}
        />
        <Button
          onClick={() => {
            handleAddRemoveBtnClick(1);
          }}
          variant="light"
        >
          +1
      </Button>
      </div>
    </div>
  );
}