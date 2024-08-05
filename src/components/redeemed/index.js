import React from "react";
import { Route, Redirect, useRouteMatch, Switch } from "react-router-dom";

import { InfoBox } from "components/atoms";
import { useInfoMessage } from "hooks";

import Steps from "./steps";
import useRedeemedData from "./use_redeemed_data";
import useCompletedFlowPaths from "./use_redeemed_flow_paths";
import { OVERVIEW } from "./redeemed_steps";

const Redeemed = () => {
  const match = useRouteMatch();
  const { path } = match;
  const { getLinkToStep } = useCompletedFlowPaths();
  const [infoMessage, showInfoBox] = useInfoMessage();

  useRedeemedData(showInfoBox, true);

  return (
    <Switch>
      {infoMessage && <InfoBox>{infoMessage}</InfoBox>}
      <Route path={`${path}/checklist/:flowName`} component={Steps} />
      <Redirect from={`${path}`} to={getLinkToStep(OVERVIEW)} />
    </Switch>
  );
};

export default Redeemed;
