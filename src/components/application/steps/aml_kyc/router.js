import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Route, useRouteMatch, Switch } from "react-router-dom";

import { useInfoMessage } from "hooks";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";

import Referral from "./referral";
import AmlKycHomeScreen from "./aml_kyc_home_screen";
import Validate from "./validate";

const AssetsAndLiabilitiesRouter = () => {
  const match = useRouteMatch();
  const { path } = match;

  const { id } = useParams();
  const [infoMessage, showInfoBox] = useInfoMessage();
  const dispatch = useDispatch();

  const sendInitialRequests = useFetchAndStoreApplicants({
    showInfoBox,
    id,
  });

  useEffect(() => {
    sendInitialRequests();
  }, [dispatch, id, sendInitialRequests]);

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}
      <Switch>
        <Route
          exact
          path={`${path}/referral/:indexOfElement?`}
          component={Referral}
        />
        <Route exact path={`${path}/validate`} component={Validate} />
        <Route exact path={path} component={AmlKycHomeScreen} />
      </Switch>
    </>
  );
};

export default AssetsAndLiabilitiesRouter;
