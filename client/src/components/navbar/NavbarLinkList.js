import React from "react";
import { Link } from "react-router-dom";

export default function NavbarLinkList() {
  return (
    <ul className="navbar-link-list">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/checkout">Checkout</Link>
      </li>
      <li>
        <Link to="/all">All Products</Link>
      </li>
    </ul>
  );
}
