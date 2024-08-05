import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import PropertyPortfolio from "./property_portfolio";
import AssetsHomeScreen from "./assets_home_screen";

const AssetsAndLiabilitiesRouter = () => {
  const match = useRouteMatch();
  const { path } = match;

  return (
    <Switch>
      <Route
        exact
        path={`${path}:indexOfElement/property_portfolio/:indexOfForm?/:indexOfProperty?`}
        component={PropertyPortfolio}
      />
      <Route exact path={path} component={AssetsHomeScreen} />
    </Switch>
  );
};

export default AssetsAndLiabilitiesRouter;
