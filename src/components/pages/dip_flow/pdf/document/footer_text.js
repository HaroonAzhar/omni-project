import React from "react";
import { StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  text: {
    fontSize: 6,
    color: "#323232",
    paddingTop: 6,
  },
});

export default () => {
  return (
    <>
      <Text style={styles.text}>
        Omni Property Finance is the trading name of Omni Property Finance
        Limited which is registered for anti-money laundering purposes with the
        FCA. Our FCA registration number is 913338.
        {"\n"}
        You can confirm our registration on the FCA’s website www.fca.org.uk or
        by contacting the FCA on 0800 111 6768. Registered in England & Wales,
        number 12085679. Registered office: 4th Floor, 15 Golden Square, London,
        WIF 9JG
      </Text>
    </>
  );
};
