import React from "react";
import "./BottomBar.scss";

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="total-info">
        <div className="total-quantity">0 KG</div>
        <div className="total-price">$0.00</div>
      </div>
    </div>
  );
}
