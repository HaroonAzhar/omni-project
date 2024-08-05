import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { SelectInput } from "components/atoms";

const SolicitorNameInput = ({ solicitors }) => {
  return (
    <Field
      label="Solicitor Firm Name"
      component={SelectInput}
      type="select"
      name="omni_solicitor_id"
      options={solicitors}
    />
  );
};

SolicitorNameInput.propTypes = {
  solicitors: PropTypes.array.isRequired,
};

export default SolicitorNameInput;
