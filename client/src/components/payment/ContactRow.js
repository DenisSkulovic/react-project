import React from "react";
import "./ContactRow.scss";

export default function ContactRow({ name, purchase, readableName }) {
  return (
    <div className={`contact-row ${name}`}>
      <div>{readableName}:</div>
      <div>{purchase[name] ? purchase[name] : "Not specified"}</div>
    </div>
  );
}
