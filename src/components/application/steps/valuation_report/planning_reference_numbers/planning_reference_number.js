import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextInput, Button } from "components/atoms";
import { StyledMultipleEntry } from "components/dip_forms_steps/styled_dip_steps";

const PlanningReferenceNumber = ({ name, onRemove }) => (
  <StyledMultipleEntry>
    <Field
      component={TextInput}
      type="text"
      name={name}
      label="Planning Reference number"
      placeholder=""
    />

    <Button kind="extra" type="button" onClick={onRemove}>
      - Remove Planning Reference
    </Button>
  </StyledMultipleEntry>
);

export default PlanningReferenceNumber;

PlanningReferenceNumber.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
