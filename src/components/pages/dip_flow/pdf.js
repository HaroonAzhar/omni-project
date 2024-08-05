import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  Font,
  View,
  Text,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import {
  Fields,
  OtherImportantFields,
  BorrowerNameCompany,
  BorrowerNameIndividual,
  CaseReference,
  FeeFields,
} from "./pdf/fields";
import ValueMapper from "./pdf/value_mapper";
import Header from "./pdf/document/head";
import BrokerInfo from "./pdf/document/broker_info";
import HeadDate from "./pdf/document/head_date";
import Title from "./pdf/document/title";
import MainTable from "./pdf/document/main_table";
import OtherInformation from "./pdf/document/other_information";
import DateFooter from "./pdf/document/date_footer";
import FooterText from "./pdf/document/footer_text";

// 2.82

Font.register({
  family: "GillSans",
  fonts: [
    { src: "/fonts/GillSans.ttf" },
    { src: "/fonts/GillSans-SemiBold.ttf", fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  body_other: {
    padding: 44,
    paddingTop: 20,
    paddingBottom: 0,
    fontFamily: "GillSans",
  },
  body: {
    padding: 44,
    paddingBottom: 0,
    paddingTop: 30,
    fontFamily: "GillSans",
  },
  headContainer: {
    flexDirection: "row",
  },
});

const brokerName = (data) => {
  if (data.broker_company_name) {
    return data.broker_company_name;
  }

  return data.broker_name;
};

const removeDotsFromSecurityAddress = (input) => {
  const value = { ...input };
  Object.keys(value).forEach((propertyName) => {
    if (typeof value[propertyName] !== "string") return;
    value[propertyName] = value[propertyName].replace(",", "");
  });
  return value;
};

const humanizeSecurityCountry = (input) => {
  const value = { ...input };
  if (value.security_country) {
    value.security_country = titleize(value.security_country);
  }
  return value;
};

const prepareSecurityAddress = (data) => {
  return data.map((value) => {
    let updated = { ...value };
    updated = removeDotsFromSecurityAddress(updated);
    updated = humanizeSecurityCountry(updated);
    return updated;
  });
};

const DipPdf = (props) => {
  const { data } = props;
  data.securities = prepareSecurityAddress(data.securities);

  const mapper = new ValueMapper();
  Fields[
    Fields.findIndex((obj) => obj.name === "further_drawdowns")
  ].hide = false;
  Fields[Fields.findIndex((obj) => obj.name === "build_period")].hide = false;
  const estimateInterestIndex = Fields.findIndex(
    (obj) => obj.name === "estimate_interest"
  );
  const totalLoanFacilityIndex = Fields.findIndex(
    (obj) => obj.name === "total_loan_facility"
  );
  Fields[totalLoanFacilityIndex].description = "";
  Fields[estimateInterestIndex].label = "Estimated Interest";
  Fields[Fields.findIndex((obj) => obj.name === "build_period")].hide = true;

  if (
    data.loan_advance_type === "multiple" ||
    data.building_type === "development"
  ) {
    Fields[Fields.findIndex((obj) => obj.name === "build_period")].hide = false;
  }

  if (data.loan_advance_type !== "multiple") {
    Fields[
      Fields.findIndex((obj) => obj.name === "further_drawdowns")
    ].hide = true;
  }

  if (data.type_of_loan === "rolled_up") {
    Fields[totalLoanFacilityIndex].description = "(Excluding interest)";
  }

  if (data.type_of_loan === "serviced") {
    Fields[estimateInterestIndex].label = "Interest";
  }

  mapper.appendFields(Fields);
  mapper.appendFields(FeeFields);
  mapper.appendFields(OtherImportantFields);
  mapper.setData(data);

  const ListFields = [...CaseReference];
  mapper.appendFields(CaseReference);

  function appendBorrowerName() {
    if (data.type_of_applicant === "company") {
      ListFields.push(...BorrowerNameCompany);
      mapper.appendFields(BorrowerNameCompany);
      return true;
    }

    ListFields.push(...BorrowerNameIndividual);
    mapper.appendFields(BorrowerNameIndividual);
  }

  appendBorrowerName();

  ListFields.push(...Fields);
  return (
    <Document>
      <Page style={styles.body}>
        <Header />
        <View style={styles.headContainer}>
          <BrokerInfo name={brokerName(data)} type={data.IntroducerType} />
          <HeadDate />
        </View>
        <Title />
        <View>
          <Text
            style={[
              {
                fontSize: 14,
                fontWeight: 600,
                paddingTop: 15,
                paddingBottom: 11,
              },
            ]}
          >
            Main features of the loan
          </Text>
        </View>
        <MainTable fields={ListFields} mapper={mapper} />
        <View>
          <Text
            style={[
              {
                fontSize: 14,
                fontWeight: 600,
                paddingTop: 15,
                paddingBottom: 11,
              },
            ]}
          >
            Fees
          </Text>
        </View>
        <MainTable fields={FeeFields} mapper={mapper} />
        <FooterText />
        <DateFooter nr="1/2" />
      </Page>
      <Page style={styles.body_other}>
        <OtherInformation mapper={mapper} data={data} />
        <DateFooter nr="2/2" />
      </Page>
    </Document>
  );
};

export default DipPdf;

DipPdf.propTypes = {
  data: PropTypes.object.isRequired,
};
