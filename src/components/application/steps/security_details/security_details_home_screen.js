import React from "react";
import PropTypes from "prop-types";

import { HomeScreen } from "components/organisms";

const formatPropertyName = (property) =>
  Object.values(property.address || {}).join("\n");

const SecuritiesHomeScreen = ({ nextStepName }) => (
  <HomeScreen
    allowAdd={false}
    step_id="security_details"
    name="properties"
    nameGetter={formatPropertyName}
    elementName="property"
    className="securitiesHomeScreen"
    nextStepName={nextStepName}
  />
);

export default SecuritiesHomeScreen;

SecuritiesHomeScreen.propTypes = {
  nextStepName: PropTypes.string.isRequired,
};
