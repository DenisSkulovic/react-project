import React from "react";
import "./Navbar.scss";
import UserMenuNav from "./UserMenuNav";
import Logo from "./Logo";
import NavbarLinkList from "./NavbarLinkList";

export default function Navbar({ className }) {
  return (
    <div className={["navbar-wrapper", className].join(" ")}>
      <nav className="store-navbar">
        <UserMenuNav />
        <NavbarLinkList />
        <Logo />
      </nav>
    </div>
  );
}
