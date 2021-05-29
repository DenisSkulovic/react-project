import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_isAuthenticated } from "../../redux/user/selectors";
import { logout } from "../../redux/user/actions";

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
      {!authStatusSelector.isAuthenticated && (
        <span>
          {!isLoginPage && <Link to="/login">Login</Link>}{" "}
          {!isLoginPage && !isRegisterPage && "|"}{" "}
          {!isRegisterPage && <Link to="/register">Register</Link>}
        </span>
      )}
      {authStatusSelector.isAuthenticated && (
        <span>
          <a href="#" onClick={(e) => handleLogout(e)}>
            Logout
          </a>
          {" | "}
          <Link to="/account">Account</Link>
        </span>
      )}
    </div>
  );
}
