import "./PaymentPDF.scss";
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
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
  items_section: {},
  title: {},
  purchase_item: {},
});

export default function PaymentPDF({ payment }) {
  return (
    <Document>
      <Page debug wrap size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            id lorem feugiat, hendrerit libero quis, aliquam ligula.
            Pellentesque tortor ante, euismod feugiat erat maximus, pellentesque
            placerat urna. Ut rutrum odio.
          </Text>
          {payment.purchase_items &&
            payment.purchase_items.map((item) => {
              <Text></Text>;
            })}
        </View>
        <View style={styles.section}>
          <Text></Text>
        </View>
      </Page>
    </Document>
  );
}
