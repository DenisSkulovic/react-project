import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Users.scss";

export default function Users() {
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
