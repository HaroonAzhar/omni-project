import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { saveFurtherCommentsState } from "store/application/actions";
import { Button, NavigationButtonContainer } from "components/atoms";
import { TextEditor, FormWrapper } from "components/molecules";
import {
  getExitStrategyOfFurtherComments,
  getOngoingMonitoringOfFurtherComments,
  getSpecialConditionsOfFurtherComments,
} from "components/case_summary/selectors";

import { FURTHER_COMMENTS } from "../../case_summary_steps";
import useCaseSummaryFlowPaths from "../../use_case_summary_flow_paths";
import { StyledInputContainer } from "../../case_summary_styles";
import { useSubmitCaseSummary } from "../shared";

const StyledLabel = styled.span`
  display: block;
  padding-bottom: 20px;
`;
const FurtherComments = () => {
  const dispatch = useDispatch();

  const exitStrategy = useSelector(getExitStrategyOfFurtherComments);
  const ongoingMonitoring = useSelector(getOngoingMonitoringOfFurtherComments);
  const specialConditions = useSelector(getSpecialConditionsOfFurtherComments);

  const submit = useSubmitCaseSummary();

  const getOnSubmitFunction = (name) => (text) => {
    const dataToSave = { [name]: text };
    dispatch(saveFurtherCommentsState(dataToSave));
    submit("further_comments", dataToSave);
  };

  const { goStepBack, goToNextStep } = useCaseSummaryFlowPaths(
    FURTHER_COMMENTS
  );

  const shouldSubmitButtonBeDisabled =
    !exitStrategy || !ongoingMonitoring || !specialConditions;

  return (
    <FormWrapper title="Further Comments">
      <StyledInputContainer>
        <StyledLabel>Exit Strategy</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("exit_strategy")}
          state={exitStrategy}
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel>Ongoing Monitoring</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("ongoing_monitoring")}
          state={ongoingMonitoring}
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel>Special Conditions</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("special_conditions")}
          state={specialConditions}
        />
      </StyledInputContainer>

      <NavigationButtonContainer>
        <Button kind="fade" onClick={goStepBack}>
          Back
        </Button>
        <Button disabled={shouldSubmitButtonBeDisabled} onClick={goToNextStep}>
          Next
        </Button>
      </NavigationButtonContainer>
    </FormWrapper>
  );
};

export default FurtherComments;
