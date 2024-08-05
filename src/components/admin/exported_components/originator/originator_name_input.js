import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { SelectInput } from "components/atoms";

const OriginatorNameInput = ({ fieldName, originators }) => {
  return (
    <Field
      label="Originator"
      component={SelectInput}
      type="select"
      name={fieldName}
      options={originators}
    />
  );
};

OriginatorNameInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  originators: PropTypes.array.isRequired,
};

export default OriginatorNameInput;
