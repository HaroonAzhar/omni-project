import React from "react";
import PropTypes from "prop-types";

import theme from "core/theme";

import { ReactComponent as FilterSvg } from "./svg/filter.svg";

const FilterIcon = ({ stroke }) => (
  <FilterSvg stroke={stroke || theme.colors.grey} />
);

FilterIcon.propTypes = {
  stroke: PropTypes.string,
};

export default FilterIcon;
