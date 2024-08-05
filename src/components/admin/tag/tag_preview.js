import React from "react";
import PropTypes from "prop-types";

import { StyledTagPreview } from "./styled_tag_preview";
import { isBackgroundDark } from "./helpers/tag_preview_helpers";
export default function TagPreview({ name, color, children }) {
  const backgroundDark = isBackgroundDark(color);
  return (
    <StyledTagPreview color={color} isBackgroundDark={backgroundDark}>
      {name}
      {children}
    </StyledTagPreview>
  );
}
TagPreview.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.node,
};
