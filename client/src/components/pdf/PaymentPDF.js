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
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
            magna suscipit magna tempus pulvinar. Etiam tristique gravida sem, a
            luctus nisl consectetur sed. Mauris ullamcorper dictum mi et porta.
            Integer lacinia leo non facilisis dictum. Suspendisse potenti.
            Vestibulum quis feugiat purus, eu interdum turpis. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Morbi luctus venenatis odio,
            quis semper ex congue vel. Integer mauris quam, egestas sit amet
            lacus et, porta lobortis augue. Morbi porttitor tortor ac libero
            porta, ac accumsan mi molestie. Suspendisse sed ante sodales,
            aliquet sapien sed, finibus tellus. Pellentesque molestie accumsan
            erat, sit amet pharetra turpis sollicitudin in. Curabitur sagittis
            urna finibus ante lobortis malesuada. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Nam vel ipsum vulputate, imperdiet metus nec, commodo tortor. Sed et
            nisl nec ante rhoncus iaculis non ac justo. Pellentesque non
            vulputate felis, eget tempor justo. Nam condimentum, quam eu
            ullamcorper blandit, dolor nulla dictum sapien, eu hendrerit erat mi
            sit amet nulla. Proin facilisis quam eu lectus pretium porttitor.
            Donec sodales commodo euismod. Fusce ac dictum elit. Nulla rutrum,
            eros dapibus aliquet semper, lectus diam porta libero, sed sagittis
            nunc nibh non dui. Proin ullamcorper turpis erat, quis tempor sapien
            hendrerit eu. Vestibulum placerat vehicula metus eget efficitur.
            Quisque sit amet imperdiet nulla, et vulputate dolor. Maecenas a
            justo ante. Donec imperdiet posuere turpis, sed consectetur lacus
            tempus vitae. Nulla ac nunc nec enim vulputate commodo et vel orci.
            Fusce molestie faucibus augue in feugiat. Donec fermentum tincidunt
            dui in bibendum. Aliquam tincidunt bibendum eros id pretium. Donec
            eu turpis ultricies, auctor orci sed, venenatis orci. Integer
            aliquam nec neque vitae ultricies. Proin bibendum neque quis feugiat
            ornare. Praesent tempor euismod euismod. Nulla odio augue, cursus eu
            sagittis quis, pharetra vel velit. Praesent id ligula quis eros
            molestie blandit laoreet ut velit. Nullam tristique laoreet felis,
            sed pretium diam dictum sed. Cras mattis lorem sem, non egestas nibh
            dapibus nec. Donec ullamcorper viverra ipsum id feugiat. Nulla.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
