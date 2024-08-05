import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";

import { shadow, inputBackground, mainBlue, lightGrey } from "styles/colors";

export const StyledCheckbox = styled.input`
  display: none;

  &:checked + label:after {
    background-color: ${mainBlue};
    left: 29px;
  }
`;

export const StyledToggle = styled.label`
  background-color: ${inputBackground};
  border-radius: 16px;
  color: transparent;
  cursor: pointer;
  height: 24px;
  margin-right: 11px;
  position: relative;
  transition: all 200ms ease-in-out;
  width: 48px;

  &:after {
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 1px 4px ${shadow};
    content: "";
    height: 16px;
    left: 4px;
    position: absolute;
    right: auto;
    top: 4px;
    transition: all 200ms ease-in-out;
    width: 16px;
  }
  ${({ disabled }) => disabled && `cursor: default;`}
`;

export const StyledToggleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ checked }) => !checked && `color: ${lightGrey}`}
`;

function AutoManualToggle({
  checked,
  name,
  label,
  disabled = false,
  initialValue = false,
}) {
  return (
    <StyledToggleWrapper checked={checked}>
      <Field
        component={({ input, id }) => (
          <StyledCheckbox
            id={id}
            disabled={disabled}
            {...input} // eslint-disable-line react/jsx-props-no-spreading
          />
        )}
        type="checkbox"
        name={name}
        id={`${name}-toggle`}
        checked={checked}
        initialValue={initialValue}
      />
      <StyledToggle htmlFor={`${name}-toggle`} disabled={disabled} />
      {label}
    </StyledToggleWrapper>
  );
}

AutoManualToggle.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  initialValue: PropTypes.bool,
};

export default AutoManualToggle;
