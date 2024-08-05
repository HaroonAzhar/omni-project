import React from "react";

import { Button, NavigationButtonContainer } from "components/atoms";
import { FormWrapper } from "components/molecules";

import { SECURITY } from "../../case_summary_steps";
import useCaseSummaryFlowPaths from "../../use_case_summary_flow_paths";
import SecurityForm from "./security_form";
import ValuationsForm from "./valuations_form";

const SecuritySummary = () => {
  const { goStepBack, goToNextStep } = useCaseSummaryFlowPaths(SECURITY);

  return (
    <FormWrapper>
      <SecurityForm />
      <ValuationsForm />

      <NavigationButtonContainer>
        <Button kind="fade" onClick={goStepBack}>
          Back
        </Button>

        <Button onClick={goToNextStep}>Next</Button>
      </NavigationButtonContainer>
    </FormWrapper>
  );
};

export default SecuritySummary;
