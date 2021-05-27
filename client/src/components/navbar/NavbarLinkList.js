import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavbarLinkList() {
  return (
    <ul className="navbar-link-list">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all">All Products</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );
}
