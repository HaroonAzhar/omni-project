import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { titleize } from "inflected";

import {
  StyledLinksContainer,
  StyledLinkText,
} from "./styled_link_to_admin_page";
import getPathToAdminPageOf from "../get_path_to_admin_page_of";

const LinkToAdminPage = ({ page }) => (
  <StyledLinksContainer>
    <Link to={getPathToAdminPageOf(page)}>
      <StyledLinkText>{titleize(page)}</StyledLinkText>
    </Link>
  </StyledLinksContainer>
);

LinkToAdminPage.propTypes = {
  page: PropTypes.string.isRequired,
};

export default LinkToAdminPage;
