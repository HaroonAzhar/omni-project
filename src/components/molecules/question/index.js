import React from "react";
import { Field, useField } from "react-final-form";
import styled from "styled-components";

import { RadioInput, TextAreaInput } from "components/atoms";
import { StyledError } from "components/atoms/text_input/styled_text_input";

export const StyledContainer = styled.fieldset`
  margin-bottom: 5px;
`;

const StyledFieldContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const StyledLabel = styled.legend`
  font-size: 1.25rem;
  margin-bottom: 10px;
  ${({ disabled, theme }) => disabled && `color: ${theme.colors.lightGrey};`}
`;

const StyledField = styled.div`
  min-width: 200px;

  & > label {
    display: inline;
  }
`;

const mapBooleanOptionalToString = (booleanValue) => {
  if (booleanValue === undefined) return "undefined";
  return booleanValue === true ? "true" : "false";
};

const mapStringToBooleanOptional = (stringValue) => {
  if (stringValue === "") return undefined;
  return stringValue === "true" ? true : false;
};

/* eslint-disable react/prop-types */
const Question = ({
  label,
  name,
  optionLabels = ["Yes", "No"],
  showDetailsWhenValueIs,
  withUndefined = false,
  disabled = false,
}) => {
  const { input, meta } = useField(name);
  const { value } = input;

  return (
    <StyledContainer>
      <StyledLabel disabled={disabled}>{label}</StyledLabel>

      <StyledFieldContainer>
        <StyledField>
          <Field
            component={RadioInput}
            type="radio"
            name={name}
            value={true}
            format={mapBooleanOptionalToString}
            parse={mapStringToBooleanOptional}
            label={optionLabels[0]}
            disabled={disabled}
          />
        </StyledField>

        <StyledField>
          <Field
            component={RadioInput}
            type="radio"
            name={name}
            format={mapBooleanOptionalToString}
            parse={mapStringToBooleanOptional}
            value={false}
            label={optionLabels[1]}
            disabled={disabled}
          />
        </StyledField>

        {withUndefined && (
          <StyledField>
            <Field
              component={RadioInput}
              type="radio"
              name={name}
              format={mapBooleanOptionalToString}
              parse={mapStringToBooleanOptional}
              value={undefined}
              label="N/A"
              disabled={disabled}
            />
          </StyledField>
        )}
      </StyledFieldContainer>

      {meta.touched && meta.error && <StyledError>{meta.error}</StyledError>}

      {showDetailsWhenValueIs !== undefined &&
        value === showDetailsWhenValueIs && (
          <Field
            component={TextAreaInput}
            name={`${name}_details`}
            label="Details"
            disabled={disabled}
          />
        )}
    </StyledContainer>
  );
};

export default Question;
