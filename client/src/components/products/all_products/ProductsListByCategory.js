import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import AllProductsItem from "./AllProductsItem";
import Paginator from "../../paginator/Paginator";

// redux
import {
  makeSelect_AllProducts_products,
  makeSelect_AllProducts_category,
  makeSelect_AllProducts_page,
  makeSelect_AllProducts_page_size,
  makeSelect_AllProducts_loading,
} from "../../../redux/productsByCategory/selectors";
import { getProductsForCategory } from "../../../redux/productsByCategory/actions";
import { makeSelect_AllProducts_order_by } from "../../../redux/productsByCategory/selectors";

function ProductsListByCategory() {
  const dispatch = useDispatch();

  const currentCategorySelector = useSelector(makeSelect_AllProducts_category);
  const productsSelector = useSelector(makeSelect_AllProducts_products);
  const order_by_Selector = useSelector(makeSelect_AllProducts_order_by);
  const page_Selector = useSelector(makeSelect_AllProducts_page);
  const page_size_Selector = useSelector(makeSelect_AllProducts_page_size);
  const loading_Selector = useSelector(makeSelect_AllProducts_loading);

  useEffect(() => {
    dispatch(
      getProductsForCategory(
        currentCategorySelector.category,
        order_by_Selector.order_by,
        page_Selector.page
      )
    );
  }, []);

  return (
    <>
      {productsSelector.products.results &&
        Math.ceil(
          productsSelector.products.count / page_size_Selector.page_size
        ) > 1 && (
          <Paginator
            pageCount={Math.ceil(
              productsSelector.products.count / page_size_Selector.page_size
            )}
          />
        )}

      <div className="products-list d-flex justify-content-center flex-wrap">
        {!loading_Selector.loading &&
          productsSelector.products.results &&
          productsSelector.products.results.results.map((prod, i) => {
            return <AllProductsItem key={i} {...prod} />;
          })}
      </div>

      {!loading_Selector.loading &&
        productsSelector.products.results &&
        Math.ceil(
          productsSelector.products.count / page_size_Selector.page_size
        ) > 1 && (
          <Paginator
            pageCount={Math.ceil(
              productsSelector.products.count / page_size_Selector.page_size
            )}
          />
        )}
    </>
  );
}

export default ProductsListByCategory;
