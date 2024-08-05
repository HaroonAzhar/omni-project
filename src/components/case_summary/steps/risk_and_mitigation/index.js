import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, NavigationButtonContainer } from "components/atoms";
import { TextEditor, FormWrapper } from "components/molecules";
import { saveRiskAndMitigationState } from "store/application/actions";
import { getUnderwriterRationaleOfRiskAndMitigation } from "components/case_summary/selectors";

import useCaseSummaryFlowPaths from "../../use_case_summary_flow_paths";
import RiskList from "./risk_list";
import { StyledInputContainer } from "../../case_summary_styles";
import { StyledLabel, useSubmitCaseSummary } from "../shared";
import { RISK_AND_MITIGATION } from "../../case_summary_steps";

const RiskAndMitigation = () => {
  const dispatch = useDispatch();

  const underwriterRationale = useSelector(
    getUnderwriterRationaleOfRiskAndMitigation
  );

  const { goStepBack, goToNextStep } = useCaseSummaryFlowPaths(
    RISK_AND_MITIGATION
  );

  const submit = useSubmitCaseSummary();

  const getOnSubmitFunction = (name) => (text) => {
    const dataToSave = { [name]: text };
    dispatch(saveRiskAndMitigationState(dataToSave));
    submit("risk_mitigations", dataToSave);
  };

  return (
    <FormWrapper title="Risk & Mitigation">
      <RiskList />

      <StyledInputContainer>
        <StyledLabel>Underwriter Rationale</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("underwriter_rationale")}
          state={underwriterRationale}
        />
      </StyledInputContainer>

      <NavigationButtonContainer>
        <Button kind="fade" onClick={goStepBack}>
          Back
        </Button>
        <Button onClick={goToNextStep}>Next</Button>
      </NavigationButtonContainer>
    </FormWrapper>
  );
};

export default RiskAndMitigation;
