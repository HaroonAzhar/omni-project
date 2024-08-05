import React from "react";
import styled from "styled-components";

import { SpinnerLoader } from "components/atoms";

export const StyledSpinnerLoader = styled(SpinnerLoader)`
  margin-right: 10px;
  position: relative;
  top: 0.5em;
`;

export const StyledCalculatingMessage = styled.div`
  margin-bottom: 5px;
`;

const CalculatingSpinner = () => (
  <StyledCalculatingMessage>
    <StyledSpinnerLoader />
    Calculating - Please Wait
  </StyledCalculatingMessage>
);

export default CalculatingSpinner;
