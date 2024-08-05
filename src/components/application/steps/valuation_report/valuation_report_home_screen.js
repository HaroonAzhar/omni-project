import React from "react";
import PropTypes from "prop-types";

import { HomeScreen } from "components/organisms";

const formatPropertyName = (property) =>
  Object.values(property.address || {}).join("\n");

const ValuationReportHomeScreen = ({ nextStepName }) => (
  <HomeScreen
    allowAdd={false}
    step_id="valuation_report"
    name="properties"
    nameGetter={formatPropertyName}
    elementName="property"
    className="valuationReportHomeScreen"
    nextStepName={nextStepName}
    detailsName="valuation_report"
  />
);

export default ValuationReportHomeScreen;

ValuationReportHomeScreen.propTypes = {
  nextStepName: PropTypes.string.isRequired,
};
