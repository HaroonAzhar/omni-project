import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextInput } from "components/atoms";

import useReferralField from "./use_referral_field";

export const ReferralTextField = ({
  name,
  label,
  referral,
  disabled = false,
}) => {
  const { parse, format } = useReferralField(referral);

  return (
    <Field
      component={TextInput}
      type="text"
      name={name}
      label={label}
      parse={parse}
      format={format}
      disabled={disabled}
    />
  );
};

ReferralTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  referral: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ReferralTextField;
