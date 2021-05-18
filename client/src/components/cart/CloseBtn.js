import React from "react";
import "./CloseBtn.scss";

export default function CloseBtn({ handleRemove }) {
  return (
    <div id="mdiv" className="cls" onClick={() => handleRemove()}>
      <div className="close-wrapper">
        <div className="mdiv">
          <div className="md"></div>
        </div>
      </div>
    </div>
  );
}
