/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { CompactPicker } from "react-color";

import { StyledLabel, StyledLabelText } from "../text_input/styled_text_input";

const ColorPicker = ({ input: { onChange }, label, disabled, className }) => {
  return (
    <StyledLabel className={className}>
      {label && <StyledLabelText disabled={disabled}>{label}</StyledLabelText>}

      <CompactPicker onChangeComplete={(color) => onChange(color.hex)} />
    </StyledLabel>
  );
};

ColorPicker.propTypes = {
  input: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default ColorPicker;
