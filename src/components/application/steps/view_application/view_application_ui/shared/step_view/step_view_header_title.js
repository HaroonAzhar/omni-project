import React from "react";
import PropTypes from "prop-types";

import { StepViewTitle } from "./styled_step_view";

const StepViewHeaderTitle = ({ title, status }) => {
  return (
    <StepViewTitle>
      <span>{title}</span>
      <span>{status}</span>
    </StepViewTitle>
  );
};

StepViewHeaderTitle.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
};

export default StepViewHeaderTitle;
