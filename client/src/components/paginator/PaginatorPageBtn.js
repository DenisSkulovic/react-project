import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  makeSelect_AllProducts_category,
  makeSelect_AllProducts_page,
  makeSelect_AllProducts_order_by,
} from "../../redux/productsByCategory/selectors";
import {
  getProductsForCategory,
  setPage,
} from "../../redux/productsByCategory/actions";

export default function PaginatorPageBtn({ page }) {
  const dispatch = useDispatch();

  const categorySelector = useSelector(makeSelect_AllProducts_category);
  const order_by_Selector = useSelector(makeSelect_AllProducts_order_by);
  const page_Selector = useSelector(makeSelect_AllProducts_page);

  const handleClick = () => {
    if (page_Selector.page !== page) {
      dispatch(setPage(page));
      dispatch(
        getProductsForCategory(
          categorySelector.category,
          order_by_Selector.order_by,
          page
        )
      );
    }
  };
  return <button onClick={() => handleClick()}>{page}</button>;
}
