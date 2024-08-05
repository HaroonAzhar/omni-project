import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { GoogleAutocomplete } from "components/atoms";

const AddressWithAutocomplete = ({
  prefix,
  onPlaceSelected,
  validate,
  disabled,
}) => (
  <Field
    component={GoogleAutocomplete}
    type="text"
    name={`${prefix}security_address`}
    label="Search address"
    placeholder="Enter postcode"
    onPlaceSelected={onPlaceSelected}
    validate={validate}
    disabled={disabled}
  />
);

export default AddressWithAutocomplete;

AddressWithAutocomplete.propTypes = {
  prefix: PropTypes.string.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
