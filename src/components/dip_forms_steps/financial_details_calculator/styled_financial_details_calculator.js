import styled from "styled-components";
import { Field } from "react-final-form";

import { shadow } from "styles/colors";
import { Fieldset, SpinnerLoader } from "components/atoms";

export const StyledForm = styled.form`
  width: 700px;
`;

export const StyledCalculatorContainer = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

export const StyledCalculatorInputsContainer = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  width: 100%;

  & input[type="text"] {
    width: 200px;
  }
`;

export const StyledLeftColumn = styled.div``;
export const StyledRightColumn = styled.div`
  border-left: solid 1px ${shadow};
  padding-left: 80px;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 58px;
  position: relative;
  width: 350px;
`;

export const StyledField = styled(Field)`
  width: 200px;
`;

export const StyledWrapperForTextInputWithRadio = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
  width: 400px;
`;

export const StyledLoanAmountFieldset = styled(Fieldset)`
  display: flex;

  & label {
    display: flex;
    min-width: 70px;
  }

  & label:first-child {
    margin-left: 15px;
  }
`;

export const StyledSpinnerLoader = styled(SpinnerLoader)`
  margin-right: 10px;
  position: relative;
  top: 0.5em;
`;

export const StyledCalculatingMessage = styled.div`
  position: absolute;
  right: -220px;
`;
