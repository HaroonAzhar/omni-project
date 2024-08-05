import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import styled from "styled-components/macro";

import { textInput } from "styles/global_blocks";

import InputWrapper from "./input_wrapper";

const createIntegerMask = (opts = {}) => {
  const numberMask = createNumberMask({
    prefix: "",
    suffix: "",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ",",
    allowDecimal: false,
    requireDecimal: false,
    ...opts,
  });

  return numberMask;
};

/* eslint-disable react/prop-types, react/jsx-props-no-spreading, no-unused-vars */
const getMaskedInputWithoutStyledProps = ({
  isCorrect,
  isError,
  isValue,
  ...props
}) => {
  return <MaskedInput {...props} />;
};
/* eslint-enable */

export const StyledIntegerInput = styled(getMaskedInputWithoutStyledProps)`
  ${textInput}
`;

/* eslint-disable react/jsx-props-no-spreading */

const IntegerInput = ({
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
      <StyledIntegerInput
        placeholder={placeholder}
        isCorrect={meta.touched && !meta.error}
        isError={meta.touched && !!meta.error}
        isValue={!!input.value}
        inputMode="numeric"
        mask={createIntegerMask()}
        disabled={disabled}
        {...input}
      />
    </InputWrapper>
  );
};

IntegerInput.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default IntegerInput;
