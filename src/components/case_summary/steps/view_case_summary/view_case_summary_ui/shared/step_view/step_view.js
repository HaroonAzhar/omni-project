import React from "react";
import PropTypes from "prop-types";

import { Accordion } from "components/molecules";

import { StepViewTitle } from "./styled_step_view";

const StepView = ({ title, children }) => {
  return (
    <Accordion
      title={<StepViewTitle>{title}</StepViewTitle>}
      defaultExpanded={true}
    >
      {children}
    </Accordion>
  );
};

StepView.propTypes = {
  title: PropTypes.element,
  children: PropTypes.element,
};

export default StepView;
