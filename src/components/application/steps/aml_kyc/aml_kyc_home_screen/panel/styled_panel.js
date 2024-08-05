import styled from "styled-components";

import { Button } from "components/atoms";

export const StyledSaveButton = styled(Button)`
  align-self: flex-end;
`;

export const StyledPanel = styled.div`
  display: float;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
`;

export const StyledPanelColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 450px;
`;

export const StyledApplicantHeading = styled(Button)`
  border-bottom: none;
  color: ${({ theme }) => theme.colors.main};
  padding-left: 30px;
  text-align: left;
  :hover {
    border-bottom: none;
  }
  ${({ expanded }) => expanded && "font-weight:bold;"}
`;

export const StyledApplicantContent = styled.div`
  padding: 10px;
  ${({ expanded }) => !expanded && "display: none;"}
`;
