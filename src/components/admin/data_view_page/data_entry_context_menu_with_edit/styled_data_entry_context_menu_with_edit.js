import styled from "styled-components";

import { Button } from "components/atoms";
import { popUpBasicCss } from "styles/global_blocks";

export const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledButtonsContainer = styled.div`
  align-content: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  margin-left: 20px;
`;

export const StyledContextMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledForm = styled.form`
  ${popUpBasicCss}
  background-color: white;
  left: 0;
  margin-top: -25px;
  padding: 15px;
  position: absolute;
  width: 100%;

  &::first-child {
    margin-left: 0;
  }
`;
