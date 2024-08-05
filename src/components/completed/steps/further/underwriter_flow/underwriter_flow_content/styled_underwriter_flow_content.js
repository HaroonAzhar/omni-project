import styled from "styled-components";

import { Button } from "components/atoms";

export const UnderwriterFlowActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const UnderwriterFlowActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  width: 50%;
`;
export const StyledLabel = styled.span`
  display: block;
  padding-bottom: 5px;
  padding-top: 10px;
`;

export const SaveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const StyledSave = styled(Button)`
  min-width: 100px;
  width: 100px;
`;
