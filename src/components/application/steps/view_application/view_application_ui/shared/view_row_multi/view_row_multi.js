import React from "react";
import PropTypes from "prop-types";

import { ViewRowMultiStyle } from "./styled_view_row_multi";
import { LabelStyle } from "../shared_styles";

const ViewRowCol2 = ({ title, value = null, align_right = true }) => {
  return (
    <ViewRowMultiStyle align_right={align_right}>
      <div>
        <LabelStyle>{title}</LabelStyle>
      </div>
      <div>
        {value?.filter(Boolean).map((line) => (
          <LabelStyle>{line}</LabelStyle>
        ))}
      </div>
    </ViewRowMultiStyle>
  );
};

ViewRowCol2.propTypes = {
  title: PropTypes.string,
  //   value: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  align_right: PropTypes.bool,
};

export default ViewRowCol2;
