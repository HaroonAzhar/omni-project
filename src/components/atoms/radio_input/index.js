import React from "react";
import PropTypes from "prop-types";

import {
  StyledLabel,
  StyledRadioInputLabel,
  StyledInputWrapper,
  StyledInputReplacement,
  StyledRadioInput,
} from "./styled_radio_input";

/* eslint-disable react/jsx-props-no-spreading */

const RadioInput = ({ input, label, meta: { error, touched }, disabled }) => {
  return (
    <StyledLabel>
      <StyledInputWrapper disabled={disabled}>
        <StyledRadioInput {...input} disabled={disabled} />
        <StyledInputReplacement isError={touched && error} />
      </StyledInputWrapper>

      <StyledRadioInputLabel disabled={disabled}>{label}</StyledRadioInputLabel>
    </StyledLabel>
  );
};

RadioInput.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default RadioInput;
