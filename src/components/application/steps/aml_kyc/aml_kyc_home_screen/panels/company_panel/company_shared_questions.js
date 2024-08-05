import React from "react";
import PropTypes from "prop-types";

import {
  CreditSafeClearQuestion,
  MoneyLaunderingQuestion,
  LinksToHighRiskJurisdictionsQuestion,
} from "../shared/questions";
import { ReferralQuestionsMapper } from "../shared/referral";

export const companySharedQuestionData = [
  CreditSafeClearQuestion,
  MoneyLaunderingQuestion,
  LinksToHighRiskJurisdictionsQuestion,
];

const CompanySharedQuestions = ({ disabled = false }) => (
  <ReferralQuestionsMapper
    questionData={companySharedQuestionData}
    disabled={disabled}
  />
);

export default CompanySharedQuestions;

CompanySharedQuestions.propTypes = {
  disabled: PropTypes.bool,
};
