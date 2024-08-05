import React from "react";
import PropTypes from "prop-types";

import ChecklistRow from "../checklist_row";

function DocumentsSection({ further }) {
  return (
    <ChecklistRow
      section="documents"
      description="ensure all key documents above are saved including updated searches and signed exceptions"
      further={further}
    />
  );
}

DocumentsSection.propTypes = {
  further: PropTypes.object.isRequired,
};

export default DocumentsSection;
