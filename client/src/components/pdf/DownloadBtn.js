import React from "react";
import "./DownloadBtn.scss";
import PaymentPDF from "./PaymentPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function DownloadBtn(payment) {
  return (
    <div>
      <PDFDownloadLink
        document={<PaymentPDF payment={payment} />}
        fileName="test.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}
