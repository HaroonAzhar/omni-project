import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    fontSize: "9",
    flexDirection: "row",
    borderStyle: "solid",
    borderBottomWidth: 0.8,
    borderColor: "#D5D7E0",
  },

  companyContainer: {
    width: "50%",
    flexDirection: "column",
    paddingBottom: 10,
  },

  image: {
    width: "5%",
    marginRight: 10,
  },

  companyContactContainer: {
    width: "50%",
    flexDirection: "column",
  },
  text: {
    color: "#75787B",
    fontSize: 10,
    lineHeight: "1.1",
  },
});

export default () => (
  <View style={styles.container}>
    <View style={styles.companyContainer}>
      <Text style={styles.text}>Omni Property Finance Limited</Text>
      <Text style={styles.text}>4th Floor</Text>
      <Text style={styles.text}>15 Golden Square</Text>
      <Text style={styles.text}>London, W1F 9JG</Text>
    </View>

    <View style={[styles.companyContactContainer, { textAlign: "right" }]}>
      <Text style={styles.text}>www.omniproperty.co.uk</Text>
      <Text style={styles.text}>info@omniproperty.co.uk</Text>
      <Text style={styles.text}>020 3540 1600</Text>
    </View>
  </View>
);
