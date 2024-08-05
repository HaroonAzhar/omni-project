import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminHomePage from "./admin_home_page";
import adminPages from "./admin_pages";
import getPathToAdminPageOf from "./get_path_to_admin_page_of";

const AdminSwitch = () => {
  return (
    <Switch>
      <Route exact path="/admin/">
        <AdminHomePage />
      </Route>
      {adminPages.map(({ page, DataViewPage }) => (
        <Route exact path={getPathToAdminPageOf(page)}>
          <DataViewPage page={page} />
        </Route>
      ))}
    </Switch>
  );
};

export default AdminSwitch;
