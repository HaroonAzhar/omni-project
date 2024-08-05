import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { OnChange } from "react-final-form-listeners";

import Panel from "../../panel";
import { CreditSafeQuestion } from "../shared/questions";
import NumberOfCompanyOwners, {
  numberOfCompanyQuestionsData,
} from "./number_of_company_owners";
import CorporateDependantQuestions, {
  corporateDependantQuestionsData,
} from "./corporate_dependant_questions";
import CompanySharedQuestions, {
  companySharedQuestionData,
} from "./company_shared_questions";
import AllCompanyTypesQuestions, {
  allCompanyQuestionsData,
  CorporateStructureQuestion,
} from "./all_company_types_questions";

const CreditSafe = ({ disabled = false }) => {
  const { name, label, component: Component } = CreditSafeQuestion;

  return <Component name={name} label={label} disabled={disabled} />;
};

CreditSafe.propTypes = {
  disabled: PropTypes.bool,
};

const shouldShowCompanyTypeSelection = (values) => {
  const { innerValue = null } = values[CreditSafeQuestion.name] || {};
  return innerValue === false;
};

const getCorporateStructure = (values) => {
  const { innerValue = null } = values.corporate_structure || {};
  return innerValue;
};

const Part = styled.div`
  min-width: 400px;
`;

const questionData = [
  ...companySharedQuestionData,
  ...allCompanyQuestionsData,
  ...corporateDependantQuestionsData,
  ...numberOfCompanyQuestionsData,
];
export const companyFieldsReferral = questionData.reduce(
  (acc, field) => ({
    ...acc,
    [field.name]: field,
  }),
  {}
);

const CompanyPanel = ({ applicant, modifyApplicant, readOnly }) => {
  const LeftPart = (values, formReset, formChange) => {
    return (
      <Part>
        <CreditSafe disabled={readOnly} />
        <OnChange name={CreditSafeQuestion.name}>
          {(value) => {
            formReset();
            formChange(CreditSafeQuestion.name, value);
          }}
        </OnChange>
        {!shouldShowCompanyTypeSelection(values) && (
          <CompanySharedQuestions disabled={readOnly} />
        )}
        {shouldShowCompanyTypeSelection(values) && (
          <CorporateDependantQuestions
            corporate_structure={getCorporateStructure(values)}
            disabled={readOnly}
          />
        )}
      </Part>
    );
  };

  const RightPart = (values, formReset, formChange) => {
    return (
      <Part>
        {!shouldShowCompanyTypeSelection(values) && (
          <NumberOfCompanyOwners applicant={applicant} disabled={readOnly} />
        )}
        {shouldShowCompanyTypeSelection(values) && (
          <>
            <AllCompanyTypesQuestions disabled={readOnly} />
            <OnChange name={CorporateStructureQuestion.name}>
              {(value) => {
                formReset();
                formChange(CorporateStructureQuestion.name, value);
                formChange(
                  CreditSafeQuestion.name,
                  values[CreditSafeQuestion.name] || {}
                );
              }}
            </OnChange>
          </>
        )}
      </Part>
    );
  };
  return (
    <Panel
      applicant={applicant}
      modifyApplicant={modifyApplicant}
      left={LeftPart}
      right={RightPart}
      referralFunctions={companyFieldsReferral}
      readOnly={readOnly}
    />
  );
};
export default CompanyPanel;

CompanyPanel.propTypes = {
  applicant: PropTypes.object.isRequired,
  modifyApplicant: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};
