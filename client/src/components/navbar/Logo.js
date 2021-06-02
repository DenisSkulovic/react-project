import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img
          src="https://github.com/DenisSkulovic/react-project/blob/main/client/src/shop-logo.jpg?raw=true"
          alt="shop-logo"
        />
      </Link>
    </div>
  );
}
