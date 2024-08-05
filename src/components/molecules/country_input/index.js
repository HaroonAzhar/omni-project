import React from "react";
import { Field } from "react-final-form";
import PropTypes from "prop-types";

import { SelectInput } from "components/atoms";
/* source: https://www.gov.uk/government/publications/nationalities/list-of-countries */
import { parseUndefinedToEmptyString } from "utils";

import { countries } from "./countries_list";

const options = countries.map((countryName) => ({
  value: countryName.toLowerCase(),
  label: countryName,
}));

const emptyOption = [
  {
    value: "",
    label: " ",
  },
];

const CountryInput = ({ name, validate, disabled }) => {
  return (
    <Field
      component={SelectInput}
      type="text"
      label="Country"
      name={name}
      initialValue="united kingdom"
      options={[...emptyOption, ...options]}
      validate={validate}
      disabled={disabled}
      parse={parseUndefinedToEmptyString}
    />
  );
};

CountryInput.propTypes = {
  name: PropTypes.string,
  validate: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CountryInput;
