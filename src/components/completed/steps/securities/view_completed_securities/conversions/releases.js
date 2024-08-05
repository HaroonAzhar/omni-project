import React from "react";
import PropTypes from "prop-types";

import ConversionDetails from "./conversion_details";
import MarkAsConverted from "./mark_as_converted";

function Conversions({ security }) {
  return security.isConverted ? (
    <ConversionDetails conversionDetails={security.conversions[0]} />
  ) : (
    <MarkAsConverted security={security} />
  );
}

Conversions.propTypes = {
  security: PropTypes.object.isRequired,
};

export default Conversions;
