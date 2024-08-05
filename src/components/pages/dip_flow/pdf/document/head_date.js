import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  name: {
    flexDirection: "column",
    width: "50%",
    textAlign: "right",
    fontFamily: "GillSans",
    lineHeight: "1.7",
    fontWeight: 500,
    fontSize: 10,
    paddingTop: 10,
  },
});

export default () => (
  <View style={styles.name}>
    <Text>Date: {moment().format("DD/MM/YYYY")}</Text>
  </View>
);
