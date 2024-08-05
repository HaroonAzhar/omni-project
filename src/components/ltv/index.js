import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Ltv from "./ltv";

const LtvPage = () => {
  return (
    <Switch>
      <Redirect exact path="/ltv" to="/ltv/current" />
      <Route exact path="/ltv/current">
        <Ltv page="current" />
      </Route>
      <Route exact path="/ltv/history">
        <Ltv page="history" />
      </Route>
    </Switch>
  );
};

export default LtvPage;
