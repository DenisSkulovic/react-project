import React, { useEffect } from "react";
import "./Categories.scss";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  makeSelect_AllProducts_categories,
  makeSelect_AllProducts_category,
  makeSelect_AllProducts_page,
  makeSelect_AllProducts_order_by,
} from "../../../redux/productsByCategory/selectors";
import {
  getProductsForCategory,
  setCategory,
  getCategories,
} from "../../../redux/productsByCategory/actions";

//
//

export default function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoriesSelector = useSelector(makeSelect_AllProducts_categories);
  const categorySelector = useSelector(makeSelect_AllProducts_category);
  const order_by_Selector = useSelector(makeSelect_AllProducts_order_by);
  const page_Selector = useSelector(makeSelect_AllProducts_page);

  const handleClick = (category) => {
    dispatch(setCategory(category));
    dispatch(
      getProductsForCategory(
        category,
        order_by_Selector.order_by,
        page_Selector.page
      )
    );
  };

  return (
    <div className="categories-wrapper">
      <ul
        className={`categories list-group list-group-flush list-group-horizontal`}
      >
        {categoriesSelector.categories &&
          Object.keys(categoriesSelector.categories).map((key, i) => {
            const name = categoriesSelector.categories[key]["name"];
            return (
              <li
                className={`list-group-item${
                  categorySelector.category === name ? " active" : ""
                }`}
                key={i}
                onClick={() => {
                  handleClick(name);
                }}
              >
                {name}
              </li>
            );
          })}
        <li
          className={`list-group-item${
            categorySelector.category === "all" ? " active" : ""
          }`}
          onClick={() => {
            handleClick("all");
          }}
        >
          All
        </li>
      </ul>
    </div>
  );
}
