import React from "react";
import { Field, useField } from "react-final-form";
import PropTypes from "prop-types";

import { SelectInput } from "components/atoms";

import { StyledQuestionLabel } from "./styled_questions";
import { useReferralField } from "./referral";

const mapBooleanOptionalToString = (booleanValue) => {
  if (booleanValue === undefined) return "undefined";
  return booleanValue === true ? "true" : "false";
};

const mapStringToBooleanOptional = (stringValue) => {
  if (stringValue === "") return undefined;
  return stringValue === "true" ? true : false;
};

const SelectQuestion = ({
  name,
  label,
  optionLabels = ["Yes", "No"],
  referral,
  referralMessage = "Refer to MLRO",
  disabled = false,
}) => {
  const { input } = useField(name);
  const { value } = input;

  const { parse, format } = useReferralField(referral);
  const parseWithMap = (inputValue) => {
    const booleanValue = mapStringToBooleanOptional(inputValue);
    return parse(booleanValue);
  };
  const formatWithMap = (formValue) => {
    const innerValue = format(formValue);
    return mapBooleanOptionalToString(innerValue);
  };

  const selectQuestionOptions = [
    { label: "Choose one", value: "" },
    { label: optionLabels[0], value: "true" },
    { label: optionLabels[1], value: "false" },
  ];

  return (
    <>
      <Field
        component={SelectInput}
        options={selectQuestionOptions}
        name={name}
        type="select"
        label={label}
        disabled={disabled}
        format={formatWithMap}
        parse={parseWithMap}
      />
      {value.referral && (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <StyledQuestionLabel color="warn" text={referralMessage} />
      )}
    </>
  );
};

SelectQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  optionLabels: PropTypes.array,
  referral: PropTypes.func,
  referralMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectQuestion;
