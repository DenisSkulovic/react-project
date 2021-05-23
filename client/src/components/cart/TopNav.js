import React from "react";
import "./TopNav.scss";

export default function TopNav() {
  return (
    <div className="cart-top-nav-wrapper">
      <div className="cart-top-nav">
        <div className="greeting">
          {
            window.sessionStorage.getItem("Email") ? `Logged in as ${window.sessionStorage.getItem("Email")}` : 'Browsing as Anonymous'
          }
        </div>
      </div>
    </div>
  );
}
