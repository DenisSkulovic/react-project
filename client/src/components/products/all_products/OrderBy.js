import React from "react";
import "./OrderBy.scss";
import OrderBy_choice from "./OrderBy_choice";

export default function OrderBy() {
  const choices = ["name", "category", "unit_price"];
  return (
    <div className="order-by-wrapper">
      <ul
        className={`order-by list-group list-group-flush list-group-horizontal`}
      >
        {choices.map((choice, i) => {
          const choice_names = ["Name", "Category", "Price"];
          return (
            <OrderBy_choice
              key={i}
              choice={choice}
              choiceName={choice_names[i]}
            />
          );
        })}
      </ul>
    </div>
  );
}
