import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

export default function PurchaseRow({ styles, item }) {
  console.log("styles.tableRow", styles.tableRow);
  console.log("styles.tableCol", styles.tableCol);
  console.log("styles.tableCell", styles.tableCell);

  return (
    <View style={{ ...styles.tableRow }}>
      <View style={{ ...styles.tableCol }}>
        <Text style={{ ...styles.tableCell, ...styles.textLeft }}>
          {item.product.name}
        </Text>
      </View>
      <View style={{ ...styles.tableCol }}>
        <Text style={{ ...styles.tableCell, ...styles.textLeft }}>
          {item.product.category.name}
        </Text>
      </View>
      <View style={{ ...styles.tableCol }}>
        <Text style={{ ...styles.tableCell, ...styles.textRight }}>
          {item.quantity}
          {item.product.unit}
        </Text>
      </View>
      <View style={{ ...styles.tableCol }}>
        <Text style={{ ...styles.tableCell, ...styles.textRight }}>
          ${item.price}/{item.product.unit}
        </Text>
      </View>
      <View style={{ ...styles.tableCol }}>
        <Text style={{ ...styles.tableCell, ...styles.textRight }}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
