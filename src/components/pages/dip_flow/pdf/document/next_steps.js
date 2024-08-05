import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    padding: 44,
    fontFamily: "GillSans",
  },
  nextStepsContainer: {
    paddingTop: 0,
    paddingBottom: 10,
    fontSize: "9",
    flexDirection: "column",
  },
  nextStepsTable: {
    backgroundColor: "#F9F9F9",
    paddingTop: 7,
    paddingLeft: 19,
    paddingBottom: 5,
    paddingRight: 25,
  },
  nextStepsHeadText: {
    color: "#000",
    fontWeight: 600,
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  nextStepsText: {
    fontFamily: "GillSans",
    color: "#323232",
    fontWeight: 500,
    paddingTop: 3,
  },
  nextStepBulletList: {
    flexDirection: "row",
  },
  bullet: {
    width: 10,
    paddingTop: 3,
  },
  nexStepTermsText: {
    fontSize: 8.5,
    padding: 10,
    paddingLeft: 0,
    paddingTop: 5,
    paddingRight: 5,
  },
  termsText: {
    fontSize: 8.5,
    padding: 10,
    paddingTop: 0,
    paddingLeft: 3,
    paddingBottom: 0,
    paddingRight: 28,
  },
  nextStepTermContainer: {
    marginTop: 3,
    paddingTop: 3,
    borderColor: "#D5D7E0",
    borderTopWidth: 0.5,
    paddingRight: 10,
    marginRight: 5,
  },
  termsText1: {
    fontSize: 10,
    fontWeight: 600,
    paddingBottom: 0,
  },

  image: {
    width: "20%",
    paddingLeft: 3,
  },
  sign: {
    fontSize: 6.3,
    paddingLeft: 3,
    paddingTop: 5,
  },
});

const NextSteps = () => {
  return (
    <>
      <View style={styles.nextStepsContainer}>
        <View style={styles.nextStepsTable}>
          <Text style={styles.nextStepsHeadText}>Next steps</Text>
          {/* eslint-disable-next-line max-len */}
          <Text
            style={[
              styles.nextStepsText,
              { paddingBottom: 5, fontWeight: 600 },
            ]}
          >
            In order that we may proceed to the next stage the following
            documentation and information must be provided. This list is not
            exhaustive and further information may be required by us:
          </Text>
          <View style={styles.nextStepBulletList}>
            {/* eslint-disable-next-line no-useless-concat */}
            <Text style={styles.bullet}>{"\u2022" + " "}</Text>
            <Text style={styles.nextStepsText}>
              A fully completed and signed application form (for all borrowers
              and guarantors);
            </Text>
          </View>
          <View style={styles.nextStepBulletList}>
            {/* eslint-disable-next-line no-useless-concat */}
            <Text style={styles.bullet}>{"\u2022" + " "}</Text>
            <Text style={styles.nextStepsText}>
              Proof of identification (UK Passport, Non-UK Passport or UK
              Photocard Full Driving Licence)
            </Text>
          </View>
          <View style={styles.nextStepBulletList}>
            {/* eslint-disable-next-line no-useless-concat */}
            <Text style={styles.bullet}>{"\u2022" + " "}</Text>
            {/* eslint-disable-next-line max-len */}
            <Text style={styles.nextStepsText}>
              Proof of Residency dated within the last 3 months (Council Tax
              Demand or Statement, Bank Statement or Credit Card Statement,
              Utility Bill, Photocard Full Driving Licence); and
            </Text>
          </View>
          <View style={styles.nextStepBulletList}>
            {/* eslint-disable-next-line no-useless-concat */}
            <Text style={styles.bullet}>{"\u2022" + " "}</Text>
            {/* eslint-disable-next-line max-len */}
            <Text style={[styles.nextStepsText, { paddingBottom: 5 }]}>CV</Text>
          </View>
          {/* eslint-disable-next-line max-len */}
        </View>
      </View>
      {/* eslint-disable-next-line no-useless-concat */}
      <Text style={styles.nexStepTermsText}>
        The terms of this letter and any dispute or claim arising out of or in
        connection with it will be governed by and construed in accordance with
        English & Welsh law and subject to the jurisdiction of the courts of
        England.
      </Text>
      <Text style={styles.termsText}>Yours faithfully,</Text>
      <Image src="/img/sign.jpg" style={styles.image} />
      <Text style={styles.sign}>Elissa von Broembsen-Kluever</Text>
      <Text style={[styles.termsText, { paddingBottom: 5 }]}>
        For and on behalf of Omni Property Finance Limited
      </Text>
      <View style={styles.nextStepTermContainer}>
        <Text style={[styles.termsText1, { paddingTop: 5 }]}>
          This letter merely sets out the basis upon which we are prepared to
          process a final application from you and is not in any way a binding
          commitment on the part of Omni Property Finance Limited or any of its
          Officers.
        </Text>
      </View>
    </>
  );
};

export default NextSteps;
