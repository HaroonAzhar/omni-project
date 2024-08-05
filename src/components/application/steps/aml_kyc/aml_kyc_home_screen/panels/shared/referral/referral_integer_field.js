import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import IntegerInput from "components/atoms/text_input/integer_input";
import { normalizePrice } from "components/atoms/integer_field";

import useReferralField from "./use_referral_field";

const ReferralIntegerField = ({ name, label, referral, disabled = false }) => {
  const { parse, format } = useReferralField(referral);

  const parseWithNormalize = (value) => {
    const normalizedValue = normalizePrice(value);
    return parse(normalizedValue);
  };

  return (
    <Field
      component={IntegerInput}
      type="text"
      name={name}
      label={label}
      parse={parseWithNormalize}
      format={format}
      disabled={disabled}
    />
  );
};

ReferralIntegerField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  referral: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ReferralIntegerField;
