import React from "react";
import PropTypes from "prop-types";

import ChecklistRow from "../checklist_row";

function ExperianSection({ further }) {
  return (
    <ChecklistRow
      section="experian"
      description="if not done within last 3 months"
      further={further}
    />
  );
}

ExperianSection.propTypes = {
  further: PropTypes.object.isRequired,
};

export default ExperianSection;
