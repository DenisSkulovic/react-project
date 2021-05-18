import React from "react";

export default function BottomBar({ handleAddClick }) {
  return (
    <div className="bottom-bar">
      <div className="total-info">
        <div className="total-quantity">0 KG</div>
        <div className="total-price">$0.00</div>
      </div>
      <div className="add-btn-container" onClick={() => handleAddClick()}>
        {" "}
        add btn
      </div>
    </div>
  );
}
