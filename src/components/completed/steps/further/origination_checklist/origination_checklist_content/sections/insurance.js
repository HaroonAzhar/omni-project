import React from "react";
import PropTypes from "prop-types";

import ChecklistRow from "../checklist_row";

function InsuranceSection({ further }) {
  return (
    <ChecklistRow
      section="insurance"
      description="confirm valid and still in date"
      further={further}
    />
  );
}

InsuranceSection.propTypes = {
  further: PropTypes.object.isRequired,
};

export default InsuranceSection;
