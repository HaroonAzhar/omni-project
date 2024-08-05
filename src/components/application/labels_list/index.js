import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getApplicationStepsData } from "../selectors";
import { WarningLabel } from "./labels";

const LabelsContainer = styled.div`
  padding-top: 1em;
  width: 100%;
`;

const LabelsList = () => {
  const applicationSteps = useSelector(getApplicationStepsData);

  return (
    <LabelsContainer>
      <WarningLabel applicationSteps={applicationSteps} />
    </LabelsContainer>
  );
};

export default LabelsList;
