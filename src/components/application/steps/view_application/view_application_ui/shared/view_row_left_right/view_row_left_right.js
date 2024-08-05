import React from "react";
import PropTypes from "prop-types";

import { ViewRowLeftRightStyle } from "./styled_view_row_left_right";
import { LabelStyle } from "../shared_styles";

const ViewRowLeftRight = ({ title, value, align_right = true }) => {
  return (
    <ViewRowLeftRightStyle align_right={align_right}>
      <div>
        <LabelStyle>{title}</LabelStyle>
      </div>
      <div>{value && <LabelStyle>{value}</LabelStyle>}</div>
    </ViewRowLeftRightStyle>
  );
};

ViewRowLeftRight.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  align_right: PropTypes.bool,
};

export default ViewRowLeftRight;
