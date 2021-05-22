import React, { useState, useEffect } from "react";
import { setOrderBy, setPage } from "../../../redux/productsByCategory/actions";
import { getProductsForCategory } from "../../../redux/productsByCategory/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  makeSelect_AllProducts_category,
  makeSelect_AllProducts_order_by,
} from "../../../redux/productsByCategory/selectors";
import "./OrderBy_choice.scss";

export default function OrderBy_choice({ choice, choiceName }) {
  const dispatch = useDispatch();
  const orderBySelector = useSelector(makeSelect_AllProducts_order_by);
  const currentCategorySelector = useSelector(makeSelect_AllProducts_category);

  const [active, setActive] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");

  useEffect(() => {
    if (orderBySelector.order_by.replace("-", "") === choice) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const handleClick = (choice) => {
    if (`${choice}` == `${orderBySelector.order_by}`) {
      choice = `-${choice}`;
      setArrowDirection("up");
    } else {
      setArrowDirection("down");
    }
    dispatch(setOrderBy(`${choice}`));
    dispatch(setPage(1));
    dispatch(
      getProductsForCategory(currentCategorySelector.category, choice, 1)
    );
  };

  return (
    <li
      className={`list-group-item${active ? " active" : ""}`}
      onClick={() => {
        handleClick(choice);
      }}
    >
      {active && (
        <span
          className={`order-by-arrow ${
            arrowDirection === "down" ? "arrow-down" : "arrow-up"
          }`}
        >
          &darr;
        </span>
      )}{" "}
      {choiceName}
    </li>
  );
}
