import styled from "styled-components";

import { Button } from "components/atoms";

export const StyledStepListElem = styled.li`
  ${({ theme }) => `background-color: ${theme.colors.white};`}
  ${({ active, theme }) =>
    active && `background-color: ${theme.colors.lightBlue};`}

  font-size: 16px;
  padding: 10px;
`;

export const StyledStepsNavigation = styled.div`
  padding: 20px;
  width: 300px;
  ${({ theme }) => `background-color: ${theme.colors.lightBackgroundBlue}`};
`;

export const StyledDipSummaryButton = styled(Button)`
  margin: 15px auto;
`;

export const StyledModalContent = styled.div`
  width: 900px;
`;
