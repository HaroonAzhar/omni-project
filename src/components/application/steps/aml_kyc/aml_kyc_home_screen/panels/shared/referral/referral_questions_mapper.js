import React from "react";
import PropTypes from "prop-types";

const ReferralQuestionsMapper = ({ questionData = [], disabled = false }) => {
  return (
    <>
      {questionData.map((field) => {
        const {
          name,
          label,
          component: Component,
          referral,
          options,
          referralMessage,
        } = field;

        return (
          <Component
            name={name}
            label={label}
            referral={referral}
            options={options}
            disabled={disabled}
            referralMessage={referralMessage}
          />
        );
      })}
    </>
  );
};

export default ReferralQuestionsMapper;

ReferralQuestionsMapper.propTypes = {
  questionData: PropTypes.array,
  disabled: PropTypes.bool,
};
