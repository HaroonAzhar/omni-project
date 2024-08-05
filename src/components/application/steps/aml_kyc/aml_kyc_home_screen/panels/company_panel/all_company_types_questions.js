import React from "react";
import PropTypes from "prop-types";

import {
  MoneyLaunderingQuestion,
  LinksToHighRiskJurisdictionsQuestion,
} from "../shared/questions";
import {
  AdverseMediaCheckSatisfactoryQuestion,
  CopiesOnFileQuestion,
  ElectronicDocumentCheckSatisfactoryQuestion,
  IsOnSanctionsListQuestion,
  IsPepCompanyQuestion,
} from "./questions";
import { corporateStructuresOptions } from "../shared/options";
import {
  ReferralQuestionsMapper,
  ReferralSelectField,
} from "../shared/referral";

export const allCompanyQuestionsData = [
  IsPepCompanyQuestion,
  IsOnSanctionsListQuestion,
  ElectronicDocumentCheckSatisfactoryQuestion,
  CopiesOnFileQuestion,
  AdverseMediaCheckSatisfactoryQuestion,
  LinksToHighRiskJurisdictionsQuestion,
  MoneyLaunderingQuestion,
];

export const CorporateStructureQuestion = {
  name: "corporate_structure",
  label: "Corporate structure",
  component: ReferralSelectField,
  options: corporateStructuresOptions,
};

const CorporateStructure = ({ disabled = false }) => {
  const {
    name,
    label,
    component: Component,
    options,
  } = CorporateStructureQuestion;

  return (
    <Component
      name={name}
      label={label}
      options={options}
      disabled={disabled}
    />
  );
};

CorporateStructure.propTypes = {
  disabled: PropTypes.bool,
};

const AllCompanyTypesQuestions = ({ disabled = false }) => {
  return (
    <>
      <CorporateStructure disabled={disabled} />
      <ReferralQuestionsMapper
        questionData={allCompanyQuestionsData}
        disabled={disabled}
      />
    </>
  );
};

AllCompanyTypesQuestions.propTypes = {
  disabled: PropTypes.bool,
};

export default AllCompanyTypesQuestions;
