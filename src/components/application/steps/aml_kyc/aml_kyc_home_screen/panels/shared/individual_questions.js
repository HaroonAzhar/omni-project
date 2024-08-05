import React from "react";
import PropTypes from "prop-types";

import {
  CreditSafeQuestion,
  CreditSafeClearQuestion,
  IsPepQuestion,
  LinksToHighRiskJurisdictionsQuestion,
  MoneyLaunderingQuestion,
} from "./questions";
import { ReferralQuestionsMapper } from "./referral";

const questionData = [
  CreditSafeQuestion,
  CreditSafeClearQuestion,
  IsPepQuestion,
  LinksToHighRiskJurisdictionsQuestion,
  MoneyLaunderingQuestion,
];

const IndividualQuestions = ({ disabled = false }) => (
  <ReferralQuestionsMapper questionData={questionData} disabled={disabled} />
);

export const individualFieldsReferral = questionData.reduce(
  (acc, field) => ({
    ...acc,
    [field.name]: field,
  }),
  {}
);

export default IndividualQuestions;

IndividualQuestions.propTypes = {
  disabled: PropTypes.bool,
};
