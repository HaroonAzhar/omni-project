import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container } from "components/atoms";
import { StepsNavigation } from "components/molecules";

import useCaseSummaryFlowPaths from "../use_completed_flow_paths";
import {
  ADJUSTMENTS,
  CASHFLOWS,
  orderOfSteps,
  SUMMARY,
  WAYPOINTS,
  NOTES,
  DEFAULT_EVENTS,
  EXTENSIONS,
  MANUAL_STATUSES,
  VIEW_CASE_SUMMARY,
  VIEW_APPLICATION,
  PROVISIONS,
  SECURITIES,
  FURTHER_DRAWDOWNS,
  priorStepsView,
  ESTIMATED_REDEMPTIONS,
  FURTHER_ADVANCES,
} from "../completed_steps";
import Summary from "./summary";
import Adjustments from "./adjustments";
import Waypoints from "./waypoints";
import Notes from "./notes";
import Cashflows from "./cashflows";
import DefaultEvents from "./default_events";
import Extensions from "./extensions";
import ManualStatuses from "./manual_statuses";
import ViewCaseSummary from "./view_case_summary";
import ViewApplication from "./view_application";
import Provisions from "./provisions";
import Securities from "./securities";
import FurtherDrawdowns from "./further_drawdowns";
import EstimatedRedemptions from "./estimated_redemptions";
import FurtherAdvances from "./further_advances";

const flows = {
  [SUMMARY]: Summary,
  [CASHFLOWS]: Cashflows,
  [ADJUSTMENTS]: Adjustments,
  [WAYPOINTS]: Waypoints,
  [NOTES]: Notes,
  [DEFAULT_EVENTS]: DefaultEvents,
  [EXTENSIONS]: Extensions,
  [MANUAL_STATUSES]: ManualStatuses,
  [VIEW_CASE_SUMMARY]: ViewCaseSummary,
  [VIEW_APPLICATION]: ViewApplication,
  [PROVISIONS]: Provisions,
  [SECURITIES]: Securities,
  [FURTHER_DRAWDOWNS]: FurtherDrawdowns,
  [ESTIMATED_REDEMPTIONS]: EstimatedRedemptions,
  [FURTHER_ADVANCES]: FurtherAdvances,
};

const useCompletedSteps = () => {
  const { AdvanceType } = useSelector((state) => state.dip);

  if (AdvanceType === "multiple") {
    return [...orderOfSteps, FURTHER_DRAWDOWNS, ...priorStepsView];
  }
  return [...orderOfSteps, ...priorStepsView];
};

const Steps = () => {
  const { getLinkToStep } = useCaseSummaryFlowPaths();
  const { flowName } = useParams();
  const steps = useCompletedSteps();
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
