import React from "react";
import { closeProductDetail } from "../../../redux/productDetail/actions";
import "./CloseBtn.scss";
import { useDispatch } from "react-redux";

export default function CloseBtn() {
  const dispatch = useDispatch();

  return (
    <div
      id="mdiv"
      className="cls"
      onClick={() => {
        dispatch(closeProductDetail());
      }}
    >
      <div className="close-wrapper">
        <div className="mdiv">
          <div className="md"></div>
        </div>
      </div>
    </div>
  );
}
