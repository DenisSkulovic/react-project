import React from "react";
import "./Categories.scss";
import Button from "react-bootstrap/Button";

export default function Categories({
  uniqueCategories,
  setCurrentCategory,
  currentCategory,
}) {
  return (
    <div className="categories btn-group">
      {uniqueCategories.map((category, i) => {
        return (
          <Button
            key={i}
            block
            onClick={() => {
              setCurrentCategory(category);
            }}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
