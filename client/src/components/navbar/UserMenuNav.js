import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_isAuthenticated } from "../../redux/user/selectors";
import { logout } from "../../redux/user/actions";
import CartBtn from "../cart/CartBtn";
import { Dropdown } from "react-bootstrap";

export default function UserMenuNav() {
  const dispatch = useDispatch();
  const authStatusSelector = useSelector(makeSelect_isAuthenticated);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isRegisterPage, setIsRegisterPage] = useState(true);

  useEffect(() => {
    if (window.location.href.indexOf("login") !== -1) {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
    if (window.location.href.indexOf("register") !== -1) {
      setIsRegisterPage(true);
    } else {
      setIsRegisterPage(false);
    }
  });

  return (
    <div className="user-menu-nav">
      <CartBtn />
      {!authStatusSelector.isAuthenticated && (
        <>
          <span className="login-span">
            {!isLoginPage && <Link to="/login">Login</Link>}{" "}
          </span>
          <span className="register-span">
            {!isRegisterPage && <Link to="/register">Register</Link>}
          </span>
        </>
      )}
      {authStatusSelector.isAuthenticated && (
        <>
          <button className="logout-span btn">
            <a href="#" onClick={(e) => handleLogout(e)}>
              Logout
            </a>
          </button>
          <Dropdown>
            <Dropdown.Toggle id="account-dropdown">Account</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/account/history">History</Dropdown.Item>
              <Dropdown.Item href="/account/change-password">
                Change Password
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </div>
  );
}
