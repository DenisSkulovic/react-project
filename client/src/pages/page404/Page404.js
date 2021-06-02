import React from "react";
import "./Page404.scss";
import { Link, useHistory } from "react-router-dom";

function Page404() {
  return (
    <div className="404-page">
      <div className="main with-navbar d-flex align-items-center justify-content-center">
        <h4>404 Not Found</h4>
      </div>
    </div>
  );
}

export default Page404;
