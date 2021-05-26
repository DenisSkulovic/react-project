import React, { useState } from "react";
import "./PaymentDetail.scss";
import DownloadBtn from "../pdf/DownloadBtn";
import PurchaseTable from "./purchase/PurchaseTable";
import ShippingTable from "./shipping/ShippingTable";
import { Collapse } from "react-bootstrap";

export default function PaymentDetail({ payment }) {
  const [purchOpen, setPurchOpen] = useState(true);
  const [shipOpen, setShipOpen] = useState(true);

  const handlePurchClick = () => {
    setPurchOpen(!purchOpen);
  };
  const handleShipClick = () => {
    setShipOpen(!shipOpen);
  };

  return (
    <div className="payment-detail d-flex flex-row justify-content-around">
      <div className="purchase-items left-col col-7">
        <h4>Purchase Items</h4>
        <button onClick={() => handlePurchClick()}>toggle</button>
        <Collapse in={purchOpen}>
          <div>
            <PurchaseTable
              total_paid={payment.purchase.total_paid}
              purchase_items={payment.purchase_items}
            />
          </div>
        </Collapse>
        <DownloadBtn payment={payment} />
      </div>

      <div className="payment-details-box-wrapper right-col col-4">
        <div className="payment-details-box">
          <h4>Shipping Details</h4>
          <button onClick={() => handleShipClick()}>toggle</button>
          <Collapse in={shipOpen}>
            <div>
              <ShippingTable purchase={payment.purchase} />
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}
