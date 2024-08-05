import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    fontSize: "9",
    flexDirection: "row",
  },

  titleContainer: {
    fontFamily: "GillSans",
    fontWeight: 600,
    fontSize: "16",
    flexDirection: "column",
  },
});

export default () => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text>Decision in Principle</Text>
      <Text>
        Omni Property Finance Limited ({"\u0022"}
        OPFL
        {"\u0022"})
      </Text>
    </View>
  </View>
);
