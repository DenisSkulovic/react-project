import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Users.scss";
import { Link } from "react-router-dom";

export default function Users() {
  return (
    <>
      <Navbar className={"fixed"} />
      <div className="main with-navbar">
        <div className="container">
          <h3>Users</h3>
          <Link to="/account/history">history</Link> {" | "}
          <Link to="/account/change-password">change password</Link>
        </div>
      </div>
    </>
  );
}
