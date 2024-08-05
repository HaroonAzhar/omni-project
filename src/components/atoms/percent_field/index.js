import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import PercentInput from "../text_input/percent_input";

const normalizePrice = (value) => {
  if (!value) return undefined;
  return value.replace(/[^0-9.-]+/g, "");
};

const PercentField = ({
  name,
  label,
  validate,
  placeholder,
  disabled,
  className,
}) => (
  <Field
    component={PercentInput}
    type="text"
    name={name}
    label={label}
    placeholder={placeholder}
    validate={validate}
    parse={normalizePrice}
    disabled={disabled}
    className={className}
  />
);

export default PercentField;

PercentField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  validate: PropTypes.func,
  disabled: PropTypes.bool,
};
