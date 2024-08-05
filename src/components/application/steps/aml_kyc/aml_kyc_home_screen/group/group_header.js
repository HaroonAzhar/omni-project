import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { StyledGroupHeader } from "./styled_aml_kyc_group";

const getGroupStatus = (groupApplicants) => {
  const getStatus = ({ aml_kyc = {} }) => aml_kyc.status;
  if (groupApplicants.every((applicant) => getStatus(applicant) === "ok")) {
    return "ok";
  }
  if (
    groupApplicants.some(
      (applicant) =>
        getStatus(applicant) === "referral" ||
        getStatus(applicant) === "referral_with_mlro"
    )
  ) {
    return "referral";
  }
};
const GroupHeader = ({ groupName, groupApplicants }) => {
  const status = getGroupStatus(groupApplicants);
  return (
    <StyledGroupHeader status={status}>
      {titleize(groupName)} - {groupApplicants.length}
    </StyledGroupHeader>
  );
};

GroupHeader.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupApplicants: PropTypes.array.isRequired,
};

export default GroupHeader;
