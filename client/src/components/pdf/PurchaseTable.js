import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import PurchaseRow from "./PurchaseRow";

export default function PurchaseTable({ styles, payment }) {
  return (
    <View style={styles.table}>
      {/* TableHeader */}
      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCol, ...styles.headerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.headerCell,
              ...styles.textLeft,
            }}
          >
            Name
          </Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.headerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.headerCell,
              ...styles.textLeft,
            }}
          >
            Category
          </Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.headerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.headerCell,
              ...styles.textRight,
            }}
          >
            Quantity
          </Text>
        </View>
        <View
          style={{
            ...styles.tableCol,
            ...styles.headerCol,
          }}
        >
          <Text
            style={{
              ...styles.tableCell,
              ...styles.headerCell,
              ...styles.textRight,
            }}
          >
            Unit Price
          </Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.headerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.headerCell,
              ...styles.textRight,
            }}
          >
            Total Price
          </Text>
        </View>
      </View>

      {/* TableRows */}
      {payment.payment.purchase_items.map((item, i) => {
        return <PurchaseRow key={i} styles={styles} item={item} />;
      })}

      {/* TableTotal */}

      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCol, ...styles.footerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.footerCell,
              ...styles.textLeft,
            }}
          >
            Total:
          </Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.footerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.footerCell,
              ...styles.textLeft,
            }}
          ></Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.footerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.footerCell,
              ...styles.textRight,
            }}
          ></Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.footerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.footerCell,
              ...styles.textRight,
            }}
          ></Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.footerCol }}>
          <Text
            style={{
              ...styles.tableCell,
              ...styles.footerCell,
              ...styles.textRight,
            }}
          >
            ${payment.payment.purchase.total_paid.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
