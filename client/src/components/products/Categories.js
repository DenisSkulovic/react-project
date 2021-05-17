import React, { useEffect } from "react";
import "./Categories.scss";
import Button from "react-bootstrap/Button";

// redux
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_AllProducts_categories } from "../../redux/productsByCategory/selectors";
import {
  getProductsForCategory,
  setCategory,
  getCategories,
} from "../../redux/productsByCategory/actions";

//
//

export default function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoriesSelector = useSelector(makeSelect_AllProducts_categories);

  const handleClick = (category) => {
    dispatch(setCategory(category));
    dispatch(getProductsForCategory(category));
  };

  return (
    <div className="categories btn-group">
      {categoriesSelector.categories &&
        Object.keys(categoriesSelector.categories).map((key, i) => {
          return (
            <Button
              key={i}
              block
              onClick={() => {
                handleClick(categoriesSelector.categories[key]["name"]);
              }}
            >
              {categoriesSelector.categories[key]["name"]}
            </Button>
          );
        })}
      <Button
        block
        onClick={() => {
          handleClick("all");
        }}
      >
        All
      </Button>
    </div>
  );
}
