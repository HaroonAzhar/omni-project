import styled from "styled-components";
import { Field } from "react-final-form";

import { popUpBasicCss } from "styles/global_blocks";
import { PriceField, Button, SelectInput } from "components/atoms";

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

export const StyledField = styled(Field)`
  margin-left: 10px;
`;

export const StyledPriceField = styled(PriceField)`
  font-size: 10px;
  margin-left: 10px;
`;

export const StyledSelectInput = styled(SelectInput)``;
