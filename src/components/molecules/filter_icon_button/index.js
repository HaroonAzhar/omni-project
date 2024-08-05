import React from "react";
import PropTypes from "prop-types";

import { FilterIcon } from "components/icons";
import theme from "core/theme";
import { useQueryParamsAsFilter } from "utils";

import { StyledIcon } from "./styled_filter_button";

const FilterIconButton = ({ openFilterModal }) => {
  const { isFilteringApplied } = useQueryParamsAsFilter();
  return (
    <StyledIcon onClick={openFilterModal}>
      <FilterIcon
        stroke={isFilteringApplied() ? theme.colors.darkGreen : undefined}
      />
    </StyledIcon>
  );
};

export default FilterIconButton;

FilterIconButton.propTypes = {
  openFilterModal: PropTypes.func.isRequired,
};
