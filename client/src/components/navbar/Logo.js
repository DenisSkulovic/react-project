import React from "react";
import logo from "../../shop-logo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img src={logo} alt="shop-logo" />
      </Link>
    </div>
  );
}
