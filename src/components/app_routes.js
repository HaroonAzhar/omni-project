import React from "react";
import { Route, Switch, Redirect } from "react-router";

import CaseSummary from "components/case_summary";
import Dashboard from "components/pages/dashboard";
import DipFlow from "components/pages/dip_flow";
import EnquiryFlow from "components/pages/enquiry_flow";
import PageNotFound from "components/page_not_found";
import ApplicationSteps from "components/application/steps";
import ApplicationFacilityLetter from "components/application/facility_letter_page";
import Ltv from "components/ltv";
import AdminSwitch from "components/admin";
import Completed from "components/completed";
import Login from "components/login";
import AllWaypoints from "components/all_waypoints";
import StageRedirect from "components/pages/stage_redirect";
import RedeemedPage from "components/redeemed/index";

import useFirebaseLoginStatus from "./login/use_firebase_login_status";
import useUserSigned from "./login/use_user_signed";

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dip/:id/:indexOfStep" component={DipFlow} />
      <Route exact path="/enquiry/:id/:indexOfStep" component={EnquiryFlow} />
      <Route exact path="/enquiry/:id?/" component={EnquiryFlow} />
      <Route path="/ltv" component={Ltv} />
      <Route path="/admin" component={AdminSwitch} />
      <Route path="/waypoints" component={AllWaypoints} />

      <Route path="/case_summary/:id" component={CaseSummary} />
      <Route path="/completed/:id" component={Completed} />

      <Route
        exact
        path="/application/:id/facility_letter"
        component={ApplicationFacilityLetter}
      />

      <Route
        path="/application/:id/checklist/:flowName/:indexOfForm?/:indexOfElement?"
        component={ApplicationSteps}
      />

      <Redirect
        from="/application/:id/:tabName?/"
        to="/application/:id/checklist/view_application"
      />

      <Redirect from="/dip/:id/" to="/dip/:id/0" />
      <Redirect from="/enquiry/:id/" to="/enquiry/:id/0" />

      <Route exact path="/view/:case_number" component={StageRedirect} />
      <Route path="/redeemed/:id" component={RedeemedPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

const PublicRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
  );
};

const AppRoutes = () => {
  useFirebaseLoginStatus();
  const userSignedId = useUserSigned();
  return (
    <Switch>
      {userSignedId ? <PrivateRoutes /> : <PublicRoutes />}
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default AppRoutes;
