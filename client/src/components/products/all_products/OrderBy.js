import React from "react";
import "./OrderBy.scss";
import { useDispatch, useSelector } from "react-redux";
import { setOrderBy } from "../../../redux/productsByCategory/actions";
import { getProductsForCategory } from "../../../redux/productsByCategory/actions";
import {
  makeSelect_AllProducts_category,
  makeSelect_AllProducts_order_by,
  makeSelect_AllProducts_page,
} from "../../../redux/productsByCategory/selectors";

export default function OrderBy() {
  const dispatch = useDispatch();
  const orderBySelector = useSelector(makeSelect_AllProducts_order_by);
  const currentCategorySelector = useSelector(makeSelect_AllProducts_category);
  const page_Selector = useSelector(makeSelect_AllProducts_page);

  const handleClick = (choice) => {
    if (`${choice}` == `${orderBySelector.order_by}`) {
      choice = `-${choice}`;
    }
    dispatch(setOrderBy(`${choice}`));
    dispatch(
      getProductsForCategory(
        currentCategorySelector.category,
        choice,
        page_Selector.page
      )
    );
  };
  const choices = ["name", "category", "unit_price"];
  const choice_names = ["Name", "Category", "Price"];
  return (
    <div className="order-by-wrapper">
      <ul
        className={`order-by list-group list-group-flush list-group-horizontal`}
      >
        {choices.map((choice, i) => {
          const choice_name = choice_names[i];
          return (
            <li
              className={`list-group-item${
                orderBySelector.order_by.replace("-", "") === choice
                  ? " active"
                  : ""
              }`}
              key={i}
              onClick={() => {
                handleClick(choice);
              }}
            >
              {choice_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
