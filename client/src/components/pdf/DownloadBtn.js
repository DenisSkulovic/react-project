import React from "react";
import "./DownloadBtn.scss";
import PaymentPDF from "./PaymentPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function DownloadBtn(payment) {
  console.log("payment", payment);
  return (
    <div>
      {Object.keys(payment).length > 0 && (
        <PDFDownloadLink
          document={<PaymentPDF payment={payment} />}
          fileName="test.pdf"
        >
          {({ blob, url, loading, error }) => {
            if (error) {
              return "Error";
            }
            if (loading) {
              return "Loading document...";
            }
            return "Download PDF";
          }}
        </PDFDownloadLink>
      )}
    </div>
  );
}
