import React from "react";
import { Link } from "react-router-dom";

import getPathToAdminPageOf from "../get_path_to_admin_page_of";
import {
  StyledLinksContainer,
  StyledLinkText,
} from "./styled_link_to_admin_page";

const AdminHomePageLink = () => (
  <StyledLinksContainer>
    <Link to={getPathToAdminPageOf("")}>
      <StyledLinkText>Back to Admin Home Page</StyledLinkText>
    </Link>
  </StyledLinksContainer>
);

export default AdminHomePageLink;
