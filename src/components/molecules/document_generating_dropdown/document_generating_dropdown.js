import React from "react";
import PropTypes from "prop-types";

import ActionsDropdown from "../actions_dropdown/actions_dropdown";

const DocumentGeneratingDropdown = ({ documentActions, children }) => {
  return (
    <ActionsDropdown actions={documentActions} prompt="Generate Document">
      {children}
    </ActionsDropdown>
  );
};

DocumentGeneratingDropdown.propTypes = {
  documentActions: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default DocumentGeneratingDropdown;
