import React from "react";
import "./TopNav.scss";
import { useSelector } from "react-redux";
import { makeSelect_Users_email } from "../../redux/user/selectors";

export default function TopNav() {
  const emailSelector = useSelector(makeSelect_Users_email);
  return (
    <div className="cart-top-nav-wrapper">
      <div className="cart-top-nav">
        <div className="greeting">
          {emailSelector.email
            ? `Logged in as ${emailSelector.email}`
            : "Browsing as Anonymous"}
        </div>
      </div>
    </div>
  );
}
