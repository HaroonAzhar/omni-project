import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  StyledLabel,
  StyledRadioInputLabel,
  StyledInputWrapper,
} from "components/atoms/radio_input/styled_radio_input";

import { StyledError } from "../text_input/styled_text_input";

const StyledInput = styled.input`
  margin-left: -25px;
  position: relative;
  top: -1px;
`;

/* eslint-disable react/jsx-props-no-spreading */

const Checkbox = ({
  input,
  meta: { touched, error } = {},
  label,
  disabled,
}) => {
  return (
    <StyledLabel>
      <StyledInputWrapper>
        <StyledInput type="checkbox" {...input} disabled={disabled} />
      </StyledInputWrapper>

      <StyledRadioInputLabel disabled={disabled}>{label}</StyledRadioInputLabel>

      {touched && error && <StyledError>{error}</StyledError>}
    </StyledLabel>
  );
};

Checkbox.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;
