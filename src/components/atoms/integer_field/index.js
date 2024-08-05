import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import IntegerInput from "../text_input/integer_input";

export const normalizePrice = (value) => {
  if (!value) return undefined;
  return value.replace(/[^0-9.-]+/g, "");
};

const IntegerField = ({
  name,
  label,
  validate,
  placeholder,
  disabled,
  className,
}) => (
  <Field
    component={IntegerInput}
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

export default IntegerField;

IntegerField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  validate: PropTypes.func,
  disabled: PropTypes.bool,
};
