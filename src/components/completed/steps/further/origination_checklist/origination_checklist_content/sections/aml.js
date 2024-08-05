import React from "react";
import PropTypes from "prop-types";

import ChecklistRow from "../checklist_row";

function AMLSection({ further }) {
  return (
    <ChecklistRow
      section="aml"
      description="if not done within last 3 months"
      further={further}
    />
  );
}

AMLSection.propTypes = {
  further: PropTypes.object.isRequired,
};

export default AMLSection;
