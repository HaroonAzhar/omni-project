import React, { useState } from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import {
  StyledFormWrapper,
  StyledBackground,
} from "components/molecules/form_wrapper";
import { H1 } from "components/atoms";
import { CaseTags } from "components/molecules";

import { VIEW_APPLICATION_SUMMARY } from "../../../../../utils/application_steps";
import {
  IntroducerDetailsView,
  CompanyDetailsView,
  ApplicantDetailsView,
  CreditHistoryTableView,
  AmlKycView,
  LoanDetailsView,
  SecurityDetailsView,
  ValuationReportView,
  SolicitorDetailsView,
  AdditionalInformationView,
  AssetsAndLiabilitiesView,
  DeclarationsAndSignituresView,
} from "./steps_view";
import { StyledButton, StyledTitleBar } from "./shared/shared_styles";
import ApplicationActions from "./application_actions";

const ViewApplicationSummaryUI = ({
  viewApplicationData = {},
  showMenu = false,
}) => {
  const {
    introducer_details,
    solicitor_details,
    omniSolicitorAddress,
    applicants,
    individuals,
    properties,
    further_details,
    source_of_deposit,
    proposed_completion_date,
    purpose_of_borrowing,
    repayment_method,
    repayment_method_details,
    additional_information,
    stepsStatus,
    companies,
    initial_net_loan,
    loan_term,
    loan_type,
    expectedCompletionDate,
  } = viewApplicationData;

  const [closeAllBool, setCloseAllBool] = useState(true);

  return (
    <StyledBackground>
      <StyledFormWrapper>
        <StyledTitleBar>
          <H1>{titleize(VIEW_APPLICATION_SUMMARY)}</H1>

          {showMenu && <ApplicationActions />}
          <StyledButton
            onClick={() => {
              setCloseAllBool(!closeAllBool);
            }}
          >
            {closeAllBool ? "<<" : ">>"}
          </StyledButton>
        </StyledTitleBar>

        <CaseTags />
        {stepsStatus?.introducer_details !== undefined && (
          <IntroducerDetailsView
            introducer_details={introducer_details}
            status={stepsStatus?.introducer_details}
            expanded={closeAllBool}
          />
        )}

        {stepsStatus?.company_details !== undefined && (
          <CompanyDetailsView
            companies={companies}
            status={stepsStatus?.company_details}
            expanded={closeAllBool}
          />
        )}

        <ApplicantDetailsView
          individuals={individuals}
          status={stepsStatus?.applicant_details}
          expanded={closeAllBool}
        />

        <CreditHistoryTableView
          individuals={individuals}
          status={stepsStatus?.credit_history}
          expanded={closeAllBool}
        />

        <AmlKycView
          applicants={applicants}
          companies={companies}
          status={stepsStatus?.aml_kyc}
          expanded={closeAllBool}
        />
        <LoanDetailsView
          purpose_of_borrowing={purpose_of_borrowing}
          further_details={further_details}
          repayment_method={repayment_method}
          repayment_method_details={repayment_method_details}
          source_of_deposit={source_of_deposit}
          proposed_completion_date={proposed_completion_date}
          initial_net_loan={initial_net_loan}
          loan_term={loan_term}
          loan_type={loan_type}
          status={stepsStatus?.loan_details}
          expanded={closeAllBool}
        />
        <SecurityDetailsView
          individuals={individuals}
          applicants={applicants}
          properties={properties}
          status={stepsStatus?.security_details}
          expanded={closeAllBool}
        />

        <ValuationReportView
          properties={properties}
          status={stepsStatus?.valuation_report}
          expanded={closeAllBool}
        />

        <SolicitorDetailsView
          solicitor_details={solicitor_details}
          omniSolicitorAddress={omniSolicitorAddress}
          status={stepsStatus?.solicitor_details}
          expanded={closeAllBool}
        />
        <AdditionalInformationView
          additional_information={additional_information}
          expectedCompletionDate={expectedCompletionDate}
          status={stepsStatus?.additional_information}
          expanded={closeAllBool}
        />
        <AssetsAndLiabilitiesView
          individuals={individuals}
          status={stepsStatus?.assets_and_liabilities}
          expanded={closeAllBool}
        />
        <DeclarationsAndSignituresView
          individuals={individuals}
          status={stepsStatus?.declarations}
          expanded={closeAllBool}
        />
      </StyledFormWrapper>
    </StyledBackground>
  );
};

ViewApplicationSummaryUI.propTypes = {
  viewApplicationData: PropTypes.object,
  showMenu: PropTypes.bool,
};

export default ViewApplicationSummaryUI;
