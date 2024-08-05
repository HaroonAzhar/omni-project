import React from "react";
import PropTypes from "prop-types";

import ApplicantAssetsTable from "../../../assets_details/assets_home_screen/applicant_assets_table";
import { StepView, RenderSectionConditionally } from "../shared";
import { useExpandForStatus } from "./hooks";
const AssetsAndLiabilitiesView = ({ status, expanded, individuals }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title="Assets & Liabilities"
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        <ApplicantAssetsTable isViewOnly={true} applicantsData={individuals} />
      </RenderSectionConditionally>
    </StepView>
  );
};

AssetsAndLiabilitiesView.propTypes = {
  status: PropTypes.string,
  expanded: PropTypes.bool,
  individuals: PropTypes.array,
};

export default AssetsAndLiabilitiesView;
