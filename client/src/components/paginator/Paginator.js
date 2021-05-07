import React, { useState } from "react";
import PaginatorPageBtn from "./PaginatorPageBtn"

export default function Paginator({ pageCount, setCurrentPage }) {
    return (
        <div className="paginator">
            {[...Array(pageCount).keys()].map((i) => {
                return <PaginatorPageBtn key={i + 1} page={i + 1} setCurrentPage={setCurrentPage} />;
            })}
        </div>
    );
}
