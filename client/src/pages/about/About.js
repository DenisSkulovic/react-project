import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./About.scss";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="main with-navbar">
        <div className="container">
          <h3>About</h3>
        </div>
      </div>
    </>
  );
}
