import React from "react";

import { H1 } from "components/atoms";

import { StyledAdminPageContainer } from "./styled_admin_home_page";
import LinkToAdminPage from "../link_to_admin_page";
import adminPages from "../admin_pages";

const AdminHomePage = () => {
  return (
    <StyledAdminPageContainer>
      <H1>Admin page</H1>
      {adminPages.map(({ page }) => (
        <LinkToAdminPage page={page} key={page} />
      ))}
    </StyledAdminPageContainer>
  );
};

export default AdminHomePage;
