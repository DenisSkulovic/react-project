import React from "react";

export default function PaginatorPageBtn({ setCurrentPage, page }) {
    return (
        <button onClick={() => { setCurrentPage(page) }}>{page}</button>
    );
}
