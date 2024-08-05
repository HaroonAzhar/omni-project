import React from "react";
import { titleize } from "inflected";

import {
  StyledFormWrapper,
  StyledBackground,
} from "components/molecules/form_wrapper";
import { Cell, CaseTags } from "components/molecules";
import { currencyFormat, dateFormat, percentFormat } from "utils";
import { H1 } from "components/atoms";
import ViewCrossCollateralisedLoans from "components/case_summary/steps/borrower_profile/cross_collaterised_loans/view_cross_collateralised_loans";

import { SUMMARY } from "../../completed_steps";
import useCompletedSummaryData from "./hooks/use_completed_summary_data";
import ApplicantsTable from "./applicants_table";
import MaturityDate from "./maturity_date";
import LoanStatus from "./loan_status";
import CompletedActions from "./completed_actions";
import { CompletedSummaryTitleWrapper } from "./styled_completed_summary";

const Summary = () => {
  const {
    dateOfCompletion,
    originalDateOfMaturity,
    extendedDateOfMaturity,
    currentDateOfMaturity,
    initialNetLoanAmount,
    loanStatus,
    automaticLoanStatus,
    currentBalance,
    securitiesAddresses,
    applicants,
    currentInterestRate,
    caseManager,
    totalFacility,
    lastManualStatus,
    crossCollateralisedLoans,
  } = useCompletedSummaryData();
  return (
    <StyledBackground>
      <StyledFormWrapper>
        <CompletedSummaryTitleWrapper>
          <H1>{titleize(SUMMARY)}</H1>

          <CompletedActions
            currentInterestRate={currentInterestRate}
            dateOfMaturity={currentDateOfMaturity}
          />
        </CompletedSummaryTitleWrapper>
        <CaseTags />
        <Cell title="Case Manager">{caseManager}</Cell>
        <Cell title="Completion Date:">{dateFormat(dateOfCompletion)} </Cell>
        <MaturityDate
          extendedDateOfMaturity={extendedDateOfMaturity}
          originalDateOfMaturity={originalDateOfMaturity}
          currentDateOfMaturity={currentDateOfMaturity}
          currentInterestRate={currentInterestRate}
        />
        <Cell title="Initial Net Loan Amount">
          {currencyFormat(initialNetLoanAmount)}
        </Cell>
        <Cell title="Total Facility">{currencyFormat(totalFacility)}</Cell>
        <Cell title="Current Interest Rate">
          {percentFormat(currentInterestRate / 100)}
        </Cell>
        <Cell title="Current Balance"> {currencyFormat(currentBalance)} </Cell>
        <LoanStatus
          loanStatus={loanStatus}
          automaticLoanStatus={automaticLoanStatus}
          dateOfCompletion={dateOfCompletion}
          lastManualStatus={lastManualStatus}
        />
        <Cell title="Securities">{securitiesAddresses}</Cell>
        <ApplicantsTable applicants={applicants} />
        <ViewCrossCollateralisedLoans
          crossCollateralisedLoans={crossCollateralisedLoans}
          allowDelete={false}
        />
      </StyledFormWrapper>
    </StyledBackground>
  );
};

export default Summary;
