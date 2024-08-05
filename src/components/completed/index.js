import React from "react";
import { Route, Redirect, useRouteMatch, Switch } from "react-router-dom";

import { InfoBox } from "components/atoms";
import { useInfoMessage } from "hooks";

import Steps from "./steps";
import useCompletedData from "./use_completed_data";
import useCompletedFlowPaths from "./use_completed_flow_paths";
import { SUMMARY } from "./completed_steps";

const Completed = () => {
  const match = useRouteMatch();
  const { path } = match;
  const { getLinkToStep } = useCompletedFlowPaths();
  const [infoMessage, showInfoBox] = useInfoMessage();
  useCompletedData(showInfoBox, true);

  return (
    <Switch>
      {infoMessage && <InfoBox>{infoMessage}</InfoBox>}
      <Route path={`${path}/checklist/:flowName`} component={Steps} />
      <Redirect from={`${path}`} to={getLinkToStep(SUMMARY)} />
    </Switch>
  );
};

export default Completed;
