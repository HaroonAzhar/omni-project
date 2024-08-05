import React from "react";
import { useParams } from "react-router-dom";

import { Container } from "components/atoms";
import { StepsNavigation } from "components/molecules";

import useCaseSummaryFlowPaths from "../use_redeemed_flow_paths";
import {
  orderOfSteps,
  OVERVIEW,
  CASHFLOWS,
  VIEW_CASE_SUMMARY,
  VIEW_APPLICATION,
  priorStepsView,
} from "../redeemed_steps";
import Overview from "./overview";
import ViewCaseSummary from "../../completed/steps/view_case_summary";
import ViewApplication from "../../completed/steps/view_application";
import Cashflows from "../../completed/steps/cashflows";

const flows = {
  [OVERVIEW]: Overview,
  [CASHFLOWS]: Cashflows,
  [VIEW_CASE_SUMMARY]: ViewCaseSummary,
  [VIEW_APPLICATION]: ViewApplication,
};

const useRedeemedSteps = () => {
  return [...orderOfSteps, ...priorStepsView];
};

const Steps = () => {
  const { getLinkToStep } = useCaseSummaryFlowPaths();
  const { flowName } = useParams();
  const steps = useRedeemedSteps();
  const Flow = flows[flowName];

  return (
    <Container>
      <StepsNavigation
        storeName="case"
        steps={steps}
        getLinkToStep={getLinkToStep}
        caseNrSelector={(store) => store.case.CaseNr}
        dipStoreName="dip"
      />
      <Flow />
    </Container>
  );
};

export default Steps;
