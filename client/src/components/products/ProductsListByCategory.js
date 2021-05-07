import React, { useState } from "react";
import AllProductsItem from "./AllProductsItem";
import Paginator from "../paginator/Paginator";

export default function ProductsListByCategory({
  getProductsForCategory,
  currentCategory,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsLimit = 10;
  const products = getProductsForCategory(currentCategory);
  const pageCount = Math.floor(products.length / itemsLimit) + 1;
  const itemsToDisplay = [...products].splice(
    currentPage * itemsLimit - itemsLimit,
    currentPage * itemsLimit
  );

  return (
    <>
      <div className="products-list d-flex justify-content-center flex-wrap">
        {itemsToDisplay.map((prod, i) => {
          console.log("prod.id", prod.id);
          return <AllProductsItem key={i} {...prod} />;
        })}
      </div>
      {pageCount > 1 && (
        <Paginator pageCount={pageCount} setCurrentPage={setCurrentPage} />
      )}
    </>
  );
}
