import React from "react";
import PropTypes from "prop-types";

import { StyledTextAreaInput } from "./styled_text_input";
import InputWrapper from "./input_wrapper";

/* eslint-disable react/jsx-props-no-spreading */

const TextAreaInput = ({
  input,
  label,
  placeholder,
  meta,
  disabled,
  className,
}) => {
  return (
    <InputWrapper
      label={label}
      meta={meta}
      disabled={disabled}
      className={className}
    >
      <StyledTextAreaInput
        placeholder={placeholder}
        isCorrect={meta.touched && !meta.error}
        isError={meta.touched && !!meta.error}
        isValue={!!input.value}
        disabled={disabled}
        {...input}
      />
    </InputWrapper>
  );
};

TextAreaInput.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextAreaInput;
