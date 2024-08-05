import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: 0,
    marginLeft: 44,
    paddingRight: 0,
    paddingBottom: 44,
  },

  item: {
    width: "50%",
  },

  text: {
    fontSize: 8.5,
    color: "#ACAFC1",
  },
});

const DateFooter = (props) => {
  const { nr } = props;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.text}>{moment().format("DD/MM/YYYY")}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.text, { textAlign: "right" }]}>Page {nr}</Text>
        </View>
      </View>
    </>
  );
};

export default DateFooter;

DateFooter.propTypes = {
  nr: PropTypes.string.isRequired,
};
