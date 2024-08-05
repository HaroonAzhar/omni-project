/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Field, useField } from "react-final-form";

import { SelectInput } from "components/atoms";

import { StyledQuestionLabel } from "../styled_questions";
import useReferralField from "./use_referral_field";

const ReferralWrapper = ({ referral, children, htmlFor }) => {
  return (
    <>
      {children}
      {referral && (
        <StyledQuestionLabel
          color="warn"
          text="Refer to MLRO"
          htmlFor={htmlFor}
        />
      )}
    </>
  );
};

ReferralWrapper.propTypes = {
  referral: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

const SelectInputWithReferral = ({ referral, name, ...args }) => {
  const argsWithName = { name, ...args };
  return (
    <ReferralWrapper referral={referral} htmlFor={name}>
      <SelectInput {...argsWithName} />
    </ReferralWrapper>
  );
};

SelectInputWithReferral.propTypes = {
  referral: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

const ReferralSelectField = ({
  name,
  label,
  options,
  referral,
  disabled = false,
}) => {
  const { parse, format } = useReferralField(referral);

  const { input } = useField(name);
  const { value } = input;

  return (
    <Field
      component={SelectInputWithReferral}
      options={options}
      name={name}
      type="select"
      label={label}
      parse={parse}
      format={format}
      referral={value.referral}
      disabled={disabled}
    />
  );
};
ReferralSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  referral: PropTypes.func,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

export default ReferralSelectField;
