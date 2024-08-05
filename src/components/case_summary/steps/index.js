import React from "react";

import { Container } from "components/atoms";
import { StepsNavigation } from "components/molecules";

import useCaseSummaryFlowPaths from "../use_case_summary_flow_paths";
import { orderOfSteps } from "../case_summary_steps";
import CaseSummaryStepsRouter from "./steps_router";

const Steps = () => {
  const { getLinkToStep } = useCaseSummaryFlowPaths();

  return (
    <Container>
      <StepsNavigation
        storeName="application"
        steps={orderOfSteps}
        getLinkToStep={getLinkToStep}
      />
      <CaseSummaryStepsRouter />
    </Container>
  );
};

export default Steps;
