import styled from "styled-components";
import { Field } from "react-final-form";

export const StyledFiltersContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;
export const StyledFilterRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export const StyledSelectInputField = styled(Field)`
  margin-right: 20px;
  width: 160px;
`;
