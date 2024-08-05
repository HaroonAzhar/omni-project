import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import getResultState from "./get_result_state";

const getRefereedText = (
  noReferralFieldsRejected,
  noReferralFieldsWithoutMlro
) => {
  if (noReferralFieldsRejected !== 0) {
    return "(Referred, Rejected)";
  }
  if (noReferralFieldsWithoutMlro === 0) {
    return "(Referred, Signed Off)";
  }
  return "(Referred)";
};
const HeadingResult = ({ form, referredLink, applicant }) => {
  const {
    noIncompleteFields,
    noReferralFields,
    noReferralFieldsWithoutMlro,
    noReferralFieldsRejected,
  } = getResultState(form, applicant);

  const submitIfChanged = () => {
    if (form.getState().pristine) {
      return;
    }
    form.submit();
  };
  if (noReferralFields !== 0) {
    const referredText = getRefereedText(
      noReferralFieldsRejected,
      noReferralFieldsWithoutMlro
    );
    return referredLink ? (
      <Link to={referredLink} onClick={submitIfChanged}>
        {referredText}
      </Link>
    ) : (
      referredText
    );
  }
  if (noIncompleteFields !== 0) {
    return "(Incomplete)";
  }
  return "(OK)";
};

HeadingResult.propTypes = {
  form: PropTypes.object.isRequired,
  referredLink: PropTypes.string.isRequired,
  applicant: PropTypes.object.isRequired,
};

export default HeadingResult;
