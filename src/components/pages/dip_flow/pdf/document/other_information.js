import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";

import NextSteps from "./next_steps";

const styles = StyleSheet.create({
  container: {
    fontSize: "9",
    flexDirection: "row",
  },
  importantContainer: {
    paddingTop: 10,
    paddingRight: 5,
    lineHeight: "1.2",
    flexDirection: "column",
  },
  importantText: {
    fontSize: 8.5,
    paddingBottom: 10,
  },
  importantText3: {
    fontSize: 8.5,
    paddingBottom: 13,
  },

  importantText4: {
    fontSize: 10,
    fontFamily: "GillSans",
    fontWeight: 600,
    paddingBottom: 15,
  },
  specialConditionContainer: {
    padding: 22,
    paddingTop: 0,
    paddingBottom: 6,
    borderBottom: 0.5,
    borderColor: "#D9D9D6",
    flexDirection: "column",
    backgroundColor: "#F9F9F9",
  },
  specialConditionTextHead: {
    color: "#323232",
    fontFamily: "GillSans",
    paddingTop: 10,
    fontWeight: 600,
    fontSize: 10,
  },
  specialConditionText1: {
    color: "#323232",
    fontFamily: "GillSans",
    fontWeight: 600,
    fontSize: 9,
    paddingTop: 10,
    paddingBottom: 10,
  },

  specialConditionText2: {
    color: "#323232",
    fontFamily: "GillSans",
    fontWeight: 500,
    fontSize: 9,
    lineHeight: 1.5,
    paddingRight: 70,
  },
  flexTable: {
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#75787B",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
  },
  tableRowOtherInfo: {
    flexDirection: "row",
    fontSize: 9,
    borderRightWidth: 1,
    fontWeight: 600,
    borderColor: "#75787B",
    borderBottomWidth: 1,
  },
  tableInformationCol: {
    width: "23%",
    padding: 11,
    fontFamily: "GillSans",
    fontWeight: 600,
    backgroundColor: "#F4F4F3",
    fontSize: 10,
    borderColor: "#75787B",
    borderRightWidth: 1,
  },
  tableInformationCol2: {
    width: "77%",
    padding: 5,
    paddingBottom: 0,
    lineHeight: 1.3,
    fontWeight: 500,
  },
  tableInformationText: {
    paddingBottom: 5,
    fontSize: 10,
  },
  bold: {
    fontWeight: 600,
  },
});

const OtherInformation = (props) => {
  const { mapper, data } = props;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.flexTable}>
          <View style={styles.tableRowOtherInfo}>
            <View style={styles.tableInformationCol}>
              <Text>
                Other important
                {"\n"} information
              </Text>
            </View>
            <View style={styles.tableInformationCol2}>
              <Text style={styles.tableInformationText}>
                {/* eslint-disable-next-line max-len */}
                If you fail to make the required payments or an event of default
                arises, the above interest rate may be increased to our default
                rate, calculated on a daily basis and added to the Loan.
              </Text>
              <Text style={styles.tableInformationText}>
                A minimum of three months interest is payable if repayment of
                the Loan occurs within the first three months.
              </Text>
              <Text style={styles.tableInformationText}>
                It is important that you have a viable exit strategy to repay
                the capital and any accrued interest at the end of the term.
              </Text>
              <Text style={styles.tableInformationText}>
                Any agreement is being entered into by you wholly or
                predominantly for business purposes.
              </Text>
              <Text style={styles.tableInformationText}>
                Valuation valid for six months from date of inspection.{" "}
                {data.loan_advance_type === "multiple"
                  ? mapper.getDataByName("ltv_to_gdv")
                  : mapper.getDataByName("max_ltv_day_one")}
              </Text>
              <Text style={styles.tableInformationText}>
                <Text style={styles.bold}>
                  The property(s) we take as security may be repossessed if you
                  do do not make the required payments.
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.importantContainer}>
        <Text style={styles.importantText}>
          {/* eslint-disable-next-line max-len */}
          Please note these terms are for illustrative purposes only and do not
          constitute a formal offer or binding commitment to provide any lending
          facility. In providing this Decision in Principle we have made certain
          assumptions. These assumptions may change once you apply for a loan
          and we have fully assessed your application. This may mean that we may
          be unable to provide you with the loan if you do not meet our
          criteria.
        </Text>
        <Text style={styles.importantText3}>
          {/* eslint-disable-next-line max-len */}
          You should not undertake any commitments in reliance on this Decision
          in Principle. If you are purchasing a property you should not enter
          into a legally binding agreement based on this illustration. If you do
          decide to enter into any legally binding agreement then you do so at
          your own risk.
        </Text>
        <Text style={styles.importantText4}>
          The Decision in Principle is valid for 14 days from the date of this
          letter.
        </Text>
      </View>
      <View style={styles.specialConditionContainer}>
        <Text style={styles.specialConditionTextHead}>Special Conditions</Text>
        <Text style={styles.specialConditionText1}>
          Before we are able to agree to provide the funding indicated in this
          Decision in Principle we will require the following (but not limited
          to) to be satisfied:
        </Text>
        <Text style={styles.specialConditionText2}>
          1. Satisfactory completion of our underwriting assessment on receipt
          of a full application;
        </Text>
        <Text style={styles.specialConditionText2}>
          2. Receipt of satisfactory valuation from one of our approved panel of
          valuers;
        </Text>
        <Text style={styles.specialConditionText2}>
          3. Legal due diligence / Satisfactory report on title;
        </Text>
        <Text style={styles.specialConditionText2}>4. Credit Approval;</Text>
        <Text style={styles.specialConditionText2}>
          5. Appropriate security in the form of guarantees (personal, interest,
          capital and cost over runs) and debentures; and
        </Text>
        <Text style={[styles.specialConditionText2, { paddingBottom: 5 }]}>
          6. Client meeting.
        </Text>
      </View>
      <NextSteps />
    </>
  );
};

export default OtherInformation;
OtherInformation.propTypes = {
  mapper: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
