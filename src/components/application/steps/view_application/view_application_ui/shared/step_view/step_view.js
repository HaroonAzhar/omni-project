import React from "react";
import PropTypes from "prop-types";

import { Accordion } from "components/molecules";

import StepViewHeaderTitle from "./step_view_header_title";

const StepView = ({ title, children, status, expanded }) => {
  return (
    <Accordion
      title={<StepViewHeaderTitle title={title} status={status} />}
      defaultExpanded={expanded}
      borders={true}
    >
      {children}
    </Accordion>
  );
};

StepView.propTypes = {
  expanded: PropTypes.bool,
  status: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default StepView;
