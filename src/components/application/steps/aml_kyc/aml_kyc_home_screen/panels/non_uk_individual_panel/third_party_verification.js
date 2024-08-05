import React from "react";
import PropTypes from "prop-types";

import SelectQuestion from "../shared/select_question";

const thirdPartyVerificationOptions = [
  "Yes (ID and Residential Address Confirmed)",
  "No (ID and Residential Address Not Confirmed)",
];

const ThirdPartyVerification = ({ disabled = false }) => {
  return (
    <SelectQuestion
      optionLabels={thirdPartyVerificationOptions}
      name="third_party_verification"
      label="Third Party Verification"
      disabled={disabled}
    />
  );
};

export default ThirdPartyVerification;

ThirdPartyVerification.propTypes = {
  disabled: PropTypes.bool,
};
