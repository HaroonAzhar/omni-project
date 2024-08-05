import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import styled from "styled-components/macro";

import { textInput } from "styles/global_blocks";

import InputWrapper from "./input_wrapper";

const createCurrencyMask = (opts = {}) => {
  const decimalsRegex = /\.([0-9]{1,2})/;
  const numberMask = createNumberMask({
    prefix: "",
    suffix: "",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ",",
    allowDecimal: false,
    requireDecimal: true,
    ...opts,
  });

  return (rawValue) => {
    const mask = numberMask(rawValue);
    const result = decimalsRegex.exec(rawValue);

    // In case there is only one decimal
    if (result && result[1].length < 2) {
      mask.push("0");
    } else if (!result) {
      mask.push("0");
      mask.push("0");
    }

    return mask;
  };
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

export const StyledPercentInput = styled(getMaskedInputWithoutStyledProps)`
  ${textInput}
`;

/* eslint-disable react/jsx-props-no-spreading */

const PercentInput = ({
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
      <StyledPercentInput
        placeholder={placeholder}
        isCorrect={meta.touched && !meta.error}
        isError={meta.touched && !!meta.error}
        isValue={!!input.value}
        inputMode="numeric"
        mask={createCurrencyMask()}
        disabled={disabled}
        {...input}
      />
    </InputWrapper>
  );
};

PercentInput.propTypes = {
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

export default PercentInput;
