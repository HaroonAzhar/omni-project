import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { humanize } from "inflected";

import { FormWrapper, TextEditor, Cell } from "components/molecules";
import { saveLoanSummaryState } from "store/application/actions";
import { Button, NavigationButtonContainer, H1 } from "components/atoms";
import { mainBlue } from "styles/colors";

import useCaseSummaryFlowPaths from "../../use_case_summary_flow_paths";
import useSummaryValues from "./use_summary_values";
import {
  StyledInputContainer,
  StyledInformationContainer,
  StyledInformationColumn,
  StyledText,
} from "../../case_summary_styles";
import { StyledLabel, useSubmitCaseSummary } from "../shared";
import { LOAN_SUMMARY } from "../../case_summary_steps";

const StyledHeader = styled(H1)`
  color: ${mainBlue};
  font-size: 16px;
  margin-bottom: 40px;
`;

const StyledSection = styled.section`
  padding-bottom: 60px;
`;

const StyledSectionContent = styled.div`
  display: flex;
`;

const LoanSummary = () => {
  const dispatch = useDispatch();
  const { goStepBack, goToNextStep } = useCaseSummaryFlowPaths(LOAN_SUMMARY);

  const submit = useSubmitCaseSummary();

  const getOnSubmitFunction = (name) => (text) => {
    const dataToSave = { [name]: text };
    dispatch(saveLoanSummaryState(dataToSave));
    submit("loan", dataToSave);
  };

  const {
    isServicedLoan,
    securityType,
    type_of_loan,
    serviced,
    term,
    serviceDuration,
    exitDate,
    day1NetRelease,
    arrangementFee,
    lendersInsuranceCompletionFee,
    advancedInterest,
    drawdowns,
    totalFacility,
    totalInterest,
    interestRatePCM,
    interestType,
    totalFees,
    omniShare,
    brokerShare,
    existingFirstCharge,
    firstChargeLender,
    servicing_method_rationale,
  } = useSummaryValues();

  return (
    <FormWrapper title="Loan Summary">
      <StyledInformationContainer>
        <StyledInformationColumn>
          <Cell title="Security Type">{securityType}</Cell>
          <Cell title="Serviced">{serviced}</Cell>
          {isServicedLoan && (
            <Cell title="Service Duration? (months)">{serviceDuration}</Cell>
          )}
        </StyledInformationColumn>
        <StyledInformationColumn>
          <Cell title="Term (months)">{term}</Cell>
          <Cell title="Exit date?">{exitDate}</Cell>
        </StyledInformationColumn>
      </StyledInformationContainer>

      {isServicedLoan && (
        <StyledInputContainer withBorder={false}>
          <StyledLabel>
            Servicing Method Rationale and number of months
          </StyledLabel>

          <TextEditor
            onSubmit={getOnSubmitFunction("servicing_method_rationale")}
            state={servicing_method_rationale}
          />
        </StyledInputContainer>
      )}

      <StyledSection>
        <StyledHeader>Loan amount</StyledHeader>

        <StyledSectionContent>
          <StyledInformationColumn>
            <Cell title="Day 1 Net Release">{day1NetRelease}</Cell>
            <Cell title="Arrangement Fee">{arrangementFee}</Cell>
            <Cell title="Lenders Insurance & Completion Fee">
              {lendersInsuranceCompletionFee}
            </Cell>
          </StyledInformationColumn>
          <StyledInformationColumn>
            <Cell title={`${humanize(type_of_loan)} Interest`}>
              {advancedInterest}
            </Cell>
            <Cell title="Drawdowns">{drawdowns}</Cell>
            <Cell title="Total Facility">{totalFacility}</Cell>
          </StyledInformationColumn>
        </StyledSectionContent>
      </StyledSection>

      <StyledSection>
        <StyledHeader>Interest & Fees</StyledHeader>

        <StyledSectionContent>
          <StyledInformationColumn>
            <Cell title="Total Interest">{totalInterest}</Cell>
            <Cell title="Interest Rate PCM">{interestRatePCM}</Cell>
            <Cell title="Interest  Type">{interestType}</Cell>
          </StyledInformationColumn>
          <StyledInformationColumn>
            <Cell title="Total Fees">{totalFees}</Cell>
            <Cell title="Omni Share">{omniShare}</Cell>
            <Cell title="Broker Share">{brokerShare}</Cell>
          </StyledInformationColumn>
        </StyledSectionContent>
      </StyledSection>

      <StyledSection>
        <StyledHeader>Existing First Charge</StyledHeader>

        <StyledSectionContent>
          <StyledInformationColumn>
            <Cell title="Existing 1st Charge">
              {existingFirstCharge &&
                existingFirstCharge.map((content) => (
                  <StyledText>{content}</StyledText>
                ))}
            </Cell>
          </StyledInformationColumn>
          <StyledInformationColumn>
            <Cell title="1st Charge Lender">
              {firstChargeLender &&
                firstChargeLender.map((content) => (
                  <StyledText>{content}</StyledText>
                ))}
            </Cell>
          </StyledInformationColumn>
        </StyledSectionContent>
      </StyledSection>

      <NavigationButtonContainer>
        <Button kind="fade" onClick={goStepBack}>
          Back
        </Button>

        <Button onClick={goToNextStep}>Next</Button>
      </NavigationButtonContainer>
    </FormWrapper>
  );
};

export default LoanSummary;
