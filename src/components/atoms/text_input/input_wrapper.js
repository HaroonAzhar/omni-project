import React from "react";
import PropTypes from "prop-types";

import { StyledLabel, StyledLabelText, StyledError } from "./styled_text_input";

const TextInput = ({
  label,
  meta: { error, touched },
  disabled,
  className,
  children,
}) => {
  return (
    <StyledLabel className={className}>
      {label && <StyledLabelText disabled={disabled}>{label}</StyledLabelText>}

      {children}

      {touched && error && <StyledError>{error}</StyledError>}
    </StyledLabel>
  );
};

TextInput.propTypes = {
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TextInput;
