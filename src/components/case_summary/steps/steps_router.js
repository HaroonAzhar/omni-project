import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import CaseOverview from "./case_overview";
import AssetsAndLiabilities from "./assets_and_liabilities";
import FurtherComments from "./further_comments";
import LoanSummary from "./loan_summary";
import RiskAndMitigation from "./risk_and_mitigation";
import Security from "./security";
import {
  CASE_OVERVIEW,
  FURTHER_COMMENTS,
  ASSETS_AND_LIABILITIES,
  LOAN_SUMMARY,
  RISK_AND_MITIGATION,
  SECURITY,
  BORROWER_PROFILE,
  VIEW_CASE_SUMMARY,
  VIEW_APPLICATION_SUMMARY,
} from "../case_summary_steps";
import BorrowerProfile from "./borrower_profile";
import ViewCaseSummary from "./view_case_summary";
import ViewApplicationSummary from "./view_application_summary";

const components = {
  [CASE_OVERVIEW]: CaseOverview,
  [ASSETS_AND_LIABILITIES]: AssetsAndLiabilities,
  [FURTHER_COMMENTS]: FurtherComments,
  [LOAN_SUMMARY]: LoanSummary,
  [RISK_AND_MITIGATION]: RiskAndMitigation,
  [SECURITY]: Security,
  [BORROWER_PROFILE]: BorrowerProfile,
  [VIEW_CASE_SUMMARY]: ViewCaseSummary,
  [VIEW_APPLICATION_SUMMARY]: ViewApplicationSummary,
};

const CaseSummaryStepsRouter = () => {
  const { path } = useRouteMatch();
  const getLinkToStep = (stepName) => {
    return path.replace(":flowName", stepName);
  };

  return (
    <Switch>
      {Object.entries(components).map(([name, Component]) => (
        <Route
          key={name}
          exact
          path={getLinkToStep(name)}
          component={Component}
        />
      ))}
    </Switch>
  );
};

export default CaseSummaryStepsRouter;
