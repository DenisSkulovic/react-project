import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import PurchaseTable from "./PurchaseTable";
// import ShippingTable from "./ShippingTable";

export default function PaymentPDF({ payment }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 40,
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: "table",
      width: "auto",
    },
    // normal row style
    tableRow: { margin: "auto", flexDirection: "row" },
    tableCol: {
      width: "20%",
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
      width: "100%",
      height: "100%",
    },
    // header style
    headerCol: {
      borderStyle: "solid",
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
    },
    headerCell: {},
    // footer style
    footerCol: {
      borderStyle: "solid",
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 0,
    },
    footerCell: {},
    // common
    textLeft: {
      textAlign: "left",
    },
    textRight: {
      textAlign: "right",
    },
    textCenter: {
      textAlign: "center",
    },
  });
  console.log("payment PaymentPDF", payment);
  return (
    <Document>
      <Page debug wrap size="A4" style={styles.page}>
        <PurchaseTable styles={styles} payment={payment} />
        {/* <ShippingTable styles={styles} payment={payment} /> */}
      </Page>
    </Document>
  );
}
