import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import PriceInput from "../text_input/price_input";

const normalizePrice = (value) => {
  if (!value) return undefined;
  return value.replace(/[^0-9.]+/g, "");
};

const PriceField = ({
  name,
  label,
  validate,
  placeholder = "£££",
  disabled,
  className,
}) => (
  <Field
    component={PriceInput}
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

export default PriceField;

PriceField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  validate: PropTypes.func,
  disabled: PropTypes.bool,
};
