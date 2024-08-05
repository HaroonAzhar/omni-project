import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FormWrapper, TextEditor } from "components/molecules";
import { saveCaseOverviewState } from "store/application/actions";
import { Button, NavigationButtonContainer, TextInput } from "components/atoms";
import {
  getExecutiveSummaryOfOverview,
  getExpectedCompletionDateOfOverview,
  getStartCaseSummaryDateOfOverview,
} from "components/case_summary/selectors";
import { dateFormat } from "utils";

import { CASE_OVERVIEW } from "../../case_summary_steps";
import OverviewInfo from "./overview_info";
import { StyledLabel, useSubmitCaseSummary } from "../shared";
import {
  StyledSummarySection,
  StyledInputContainer,
  StyledDate,
} from "../../case_summary_styles";
import useCaseSummaryFlowPaths from "../../use_case_summary_flow_paths";
import useInitialRequest from "../../use_initial_request";

const defaultExecutiveSummary =
  "<h2>Borrower:</h2><br /><br /><h2>Loan Requirement:</h2><br /><br /><h2>Loan Purpose:</h2><br /><br /><h2>Loan Rationale:</h2><br /><br /><h2>Security:</h2><br /><br /><h2>Exit:</h2>";

const CaseOverview = () => {
  const { goToNextStep } = useCaseSummaryFlowPaths(CASE_OVERVIEW);
  const dispatch = useDispatch();
  const executiveSummary =
    useSelector(getExecutiveSummaryOfOverview) ?? defaultExecutiveSummary;

  const startCaseSummaryDate = useSelector(getStartCaseSummaryDateOfOverview);

  const expectedCompletionDate = useSelector(
    getExpectedCompletionDateOfOverview
  );
  const formattedStartCaseSummaryDate = startCaseSummaryDate
    ? dateFormat(startCaseSummaryDate)
    : "-";

  const submit = useSubmitCaseSummary();
  const initialRequest = useInitialRequest(() => {});

  const getOnSubmitFunction = useCallback(
    (name) => (text) => {
      const dataToSave = { [name]: text };
      dispatch(saveCaseOverviewState(dataToSave));
      submit("overview", dataToSave).then(initialRequest);
    },
    [dispatch, submit, initialRequest]
  );

  const shouldSubmitButtonBeDisabled = !executiveSummary;

  return (
    <FormWrapper title="Case Overview">
      <StyledSummarySection>
        <StyledDate>Date: {formattedStartCaseSummaryDate}</StyledDate>

        <OverviewInfo getOnSubmitFunction={getOnSubmitFunction} />

        <TextInput
          input={{
            onChange: (e) =>
              getOnSubmitFunction("expected_completion_date")(e.target.value),
            value: expectedCompletionDate,
            type: "date",
          }}
          meta={{}}
          label="Expected Completion Date"
        />
        <StyledInputContainer>
          <StyledLabel>Executive Summary</StyledLabel>
          <TextEditor
            onSubmit={getOnSubmitFunction("executive_summary")}
            state={executiveSummary}
          />
        </StyledInputContainer>
      </StyledSummarySection>

      <NavigationButtonContainer>
        <Button kind="faded" disabled={true}>
          Back
        </Button>

        <Button disabled={shouldSubmitButtonBeDisabled} onClick={goToNextStep}>
          Next
        </Button>
      </NavigationButtonContainer>
    </FormWrapper>
  );
};

export default CaseOverview;
