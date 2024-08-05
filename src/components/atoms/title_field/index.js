import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { SelectInput } from "components/atoms";

const titles = ["Mr", "Miss", "Mrs", "Ms", "Mx"];
const titlesOptions = [
  { value: undefined, label: "Choose Title" },
  ...titles.map((title) => ({ value: title, label: title })),
];

const TitleField = ({ name, label = "Title" }) => {
  return (
    <Field
      component={SelectInput}
      type="select"
      name={name}
      label={label}
      options={titlesOptions}
    />
  );
};

TitleField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default TitleField;
