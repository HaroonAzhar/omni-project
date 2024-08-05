import React from "react";
import PropTypes from "prop-types";

import { dateFormat } from "utils";

import { StepView, RenderSectionConditionally } from "../shared";
import { CopyStyle } from "../shared/shared_styles";
import { useExpandForStatus } from "./hooks";

const AdditionalInformationView = ({
  additional_information,
  expectedCompletionDate,
  status,
  expanded,
}) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title="Additional Information"
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        <CopyStyle>{additional_information?.additional_information}</CopyStyle>
        <>Expected Completion Date: {dateFormat(expectedCompletionDate)}</>
      </RenderSectionConditionally>
    </StepView>
  );
};

AdditionalInformationView.propTypes = {
  status: PropTypes.string,
  additional_information: PropTypes.object,
  expectedCompletionDate: PropTypes.string,
  expanded: PropTypes.bool,
};

export default AdditionalInformationView;
