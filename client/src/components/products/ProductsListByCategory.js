import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import AllProductsItem from "./AllProductsItem";
import Paginator from "../paginator/Paginator";

// redux
import {
  makeSelect_AllProducts_products,
  makeSelect_AllProducts_category,
} from "../../redux/productsByCategory/selectors";
import { getProductsForCategory } from "../../redux/productsByCategory/actions";

function ProductsListByCategory() {
  const dispatch = useDispatch();

  const currentCategorySelector = useSelector(makeSelect_AllProducts_category);
  const productsSelector = useSelector(makeSelect_AllProducts_products);

  useEffect(() => {
    dispatch(getProductsForCategory(currentCategorySelector.category));
  }, []);

  return (
    <>
      <div className="products-list d-flex justify-content-center flex-wrap">
        {productsSelector.products &&
          productsSelector.products.map((prod, i) => {
            return <AllProductsItem key={i} {...prod} />;
          })}
      </div>
      {/* {pageCount > 1 && <Paginator />} */}
    </>
  );
}

export default ProductsListByCategory;
