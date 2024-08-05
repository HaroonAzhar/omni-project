import React from "react";
import { Route, Redirect, useRouteMatch, Switch } from "react-router-dom";

import { InfoBox } from "components/atoms";
import { useInfoMessage } from "hooks";

import Steps from "./steps";
import useCaseSummaryData from "./use_case_summary_data";
import useCaseSummaryFlowPaths from "./use_case_summary_flow_paths";
import ConvertToCompleted from "./convert_to_completed";

const CaseSummary = () => {
  const match = useRouteMatch();
  const { path } = match;
  const { getLinkToStep } = useCaseSummaryFlowPaths();
  const [infoMessage, showInfoBox] = useInfoMessage();

  useCaseSummaryData(showInfoBox);

  return (
    <Switch>
      {infoMessage && <InfoBox>{infoMessage}</InfoBox>}
      <Route path={`${path}/convert`} component={ConvertToCompleted} />
      <Route path={`${path}/checklist/:flowName`} component={Steps} />
      <Redirect from={`${path}`} to={getLinkToStep("view_case_summary")} />
    </Switch>
  );
};

export default CaseSummary;
