import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Users.scss";
import { Redirect } from "react-router-dom";

export default function Users() {
  if (!window.sessionStorage.getItem("Email")) {
    return <Redirect to={"/login"} />;
  }
  return (
    <>
      <Navbar className={"fixed"} />
      <div className="main with-navbar">
        <div className="container">
          <h3>Users</h3>
        </div>
      </div>
    </>
  );
}
