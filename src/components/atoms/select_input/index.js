import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import { white } from "styles/colors";
import { textInput } from "styles/global_blocks";
import InputWrapper from "components/atoms/text_input/input_wrapper";

export const StyledSelectInput = styled.select`
  ${textInput}
  ${({ disabled }) => disabled && `background: ${white};`}
  height: 30px;
  max-width: 550px;
`;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable-next-line react/prop-types */
const getOptionWithLabel = ({ value, label }, index) => (
  <option key={`${index}-${value}`} value={value}>
    {label || value}
  </option>
);
const getOptionWithoutLabel = (value, index) => (
  <option key={`${index}-${value}`} value={value}>
    {value}
  </option>
);
const isArrayWithLabels = (arr) => !!arr[0].label;

const getOptionsWithGroups = ({ group, options }, index) => (
  <optgroup key={`${index}-${group}`} label={group}>
    {options.map(getOptionWithoutLabel)}
  </optgroup>
);

getOptionsWithGroups.propTypes = {
  group: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

const SelectInput = ({
  input = {},
  meta = {},
  label,
  placeholder,
  disabled,
  className,
  options,
  optionsWithGroups,
}) => {
  let optionsComponents = [];
  if (options && options.length > 0) {
    optionsComponents = options.map(
      isArrayWithLabels(options) ? getOptionWithLabel : getOptionWithoutLabel
    );
  }
  if (optionsWithGroups && optionsWithGroups.length > 0) {
    optionsComponents = [
      getOptionWithLabel({ value: "", label: "Choose one" }),
      ...optionsWithGroups.map(getOptionsWithGroups),
    ];
  }

  return (
    <InputWrapper
      label={label}
      meta={meta}
      disabled={disabled}
      className={className}
    >
      <StyledSelectInput
        placeholder={placeholder}
        isCorrect={meta.touched && !meta.error}
        isError={meta.touched && !!meta.error}
        isValue={!!input.value}
        disabled={disabled}
        {...input}
      >
        {optionsComponents}
      </StyledSelectInput>
    </InputWrapper>
  );
};

SelectInput.propTypes = {
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
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.bool, PropTypes.bool]),
        label: PropTypes.string,
      }),
    ])
  ),
  optionsWithGroups: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    })
  ),
};

export default SelectInput;
