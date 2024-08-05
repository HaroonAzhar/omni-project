import styled from "styled-components";

import { PercentField } from "components/atoms";
import { StyledButtonsContainer } from "components/dip_forms_steps/styled_dip_steps";

export const StyledDirectorRow = styled.div`
  align-items: center;
  display: flex;

  margin-bottom: 20px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  & input {
    width: 320px;
  }

  & label {
    padding: 0;
  }

  & > * {
    margin-right: 20px;
  }
`;

export const StyledNO = styled.span`
  font-size: 16px;
`;

export const StyledPercentField = styled(PercentField)`
  & > input {
    width: 80px;
  }
`;

export const StyledFirstLabel = styled.span`
  color: #323232;
  display: block;
  font-size: 16px;
  font-weight: 500;
  left: 450px;
  position: absolute;
  top: 0;
`;

export const InverseStyledButtonsContainer = styled(StyledButtonsContainer)`
  flex-direction: row-reverse;
`;
