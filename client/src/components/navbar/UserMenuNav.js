import React from "react";
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

  console.log(
    "authStatusSelector.isAuthenticated",
    authStatusSelector.isAuthenticated
  );
  return (
    <div className="user-menu-nav">
      {!authStatusSelector.isAuthenticated && (
        <span>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </span>
      )}
      {authStatusSelector.isAuthenticated && (
        <span>
          <a href="#" onClick={(e) => handleLogout(e)}>
            Logout
          </a>
        </span>
      )}
    </div>
  );
}
