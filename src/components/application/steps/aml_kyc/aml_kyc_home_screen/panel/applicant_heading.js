import React from "react";
import PropTypes from "prop-types";

import { StyledApplicantHeading } from "./styled_panel";
import HeadingResult from "./heading_result";

const ApplicantHeading = ({
  form,
  setExpanded,
  expanded,
  referredLink,
  applicant,
}) => {
  if (!form) return "";

  return (
    <StyledApplicantHeading
      kind="extra"
      type="button"
      onClick={() => {
        setExpanded(!expanded);
      }}
      expanded={expanded}
    >
      {applicant.label}{" "}
      <HeadingResult
        form={form}
        referredLink={referredLink}
        applicant={applicant}
      />
    </StyledApplicantHeading>
  );
};

ApplicantHeading.propTypes = {
  form: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
  referredLink: PropTypes.string.isRequired,
  applicant: PropTypes.object.isRequired,
};

export default ApplicantHeading;
