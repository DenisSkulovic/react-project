import React, { useState, useEffect } from "react";
import "./PaymentDetail.scss";
import DownloadBtn from "../pdf/DownloadBtn";
import PurchaseTable from "./purchase/PurchaseTable";
import ShippingTable from "./shipping/ShippingTable";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  makeSelect_History_collapse_all,
  makeSelect_History_open_all,
} from "../../redux/history/selectors";

export default function PaymentDetail({ payment }) {
  const [open, setOpen] = useState(true);
  const collapseAllSelector = useSelector(makeSelect_History_collapse_all);
  const openAllSelector = useSelector(makeSelect_History_open_all);

  const handleClick = () => {
    if (window.location.href.indexOf("checkout") !== -1) {
      return;
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (openAllSelector.open_all) {
      setOpen(true);
    }
  }, [openAllSelector.open_all]);

  useEffect(() => {
    if (collapseAllSelector.collapse_all) {
      setOpen(false);
    }
  }, [collapseAllSelector.collapse_all]);

  return (
    <div className="payment-detail-wrapper">
      <div className="payment-detail-header" onClick={() => handleClick()}>
        <span className="date">{payment.purchase.created_date} - </span>
        <span className="total">Total: </span>
        <span className="total-sum">
          ${payment.purchase.total_paid.toFixed(2)}
        </span>
        {window.location.href.indexOf("checkout") === -1 && (
          <span className={`collapse-triangle${open ? " open" : ""}`}>
            &#x25BA;
          </span>
        )}
      </div>
      <Collapse in={open}>
        <div>
          <div className="payment-detail d-flex flex-row justify-content-around">
            <div className="purchase-items left-col col-7">
              <h4>Purchase Items </h4>
              <div>
                <PurchaseTable
                  total_paid={payment.purchase.total_paid}
                  purchase_items={payment.purchase_items}
                />
              </div>
              <DownloadBtn payment={payment} />
            </div>

            <div className="payment-details-box-wrapper right-col col-4">
              <div className="payment-details-box">
                <h4>Shipping Details </h4>
                <div>
                  <ShippingTable purchase={payment.purchase} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
