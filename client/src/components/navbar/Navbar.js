import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
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
        </ul>
        <Logo />
      </nav>
    </div>
  );
}
