import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  name: {
    flexDirection: "column",
    width: "50%",
    textAlign: "left",
    fontFamily: "GillSans",
    lineHeight: "1.7",
    fontWeight: 500,
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

const BrokerDetails = (name) => {
  return <>Broker name: {name}</>;
};

const BrokerInfo = (props) => {
  const { name, type } = props;
  const who =
    type === "via_broker" ? BrokerDetails(name) : "Direct Application";
  return (
    <View style={styles.name}>
      <Text>{who}</Text>
    </View>
  );
};

export default BrokerInfo;

BrokerInfo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
