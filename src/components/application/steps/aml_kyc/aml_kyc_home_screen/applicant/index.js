import React from "react";
import PropTypes from "prop-types";

import { StyledApplicantWrapper } from "./styled_applicant";

const Applicant = ({ children }) => {
  return <StyledApplicantWrapper>{children}</StyledApplicantWrapper>;
};

Applicant.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Applicant;
