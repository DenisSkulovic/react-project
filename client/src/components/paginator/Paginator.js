import React from "react";
import PaginatorPageBtn from "./PaginatorPageBtn";
import "./Paginator.scss";

export default function Paginator({ pageCount }) {
  return (
    <div className="paginator">
      {[...Array(pageCount).keys()].map((i) => {
        return <PaginatorPageBtn key={i + 1} page={i + 1} />;
      })}
    </div>
  );
}
