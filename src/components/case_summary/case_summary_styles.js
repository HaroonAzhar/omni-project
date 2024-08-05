import styled from "styled-components";

import { shadow } from "styles/colors";

export const StyledSummarySection = styled.section`
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const StyledFormHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  width: 100%;
  & h1 {
    margin-bottom: 0;
  }
`;

export const StyledInputContainer = styled.div`
  ${({ withBorder = true }) => withBorder && `border-top: 1px solid ${shadow};`}
  margin-top: 10px;
  padding: 10px 0;
`;

export const StyledInformationContainer = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

export const StyledInformationColumn = styled.div`
  border-right: 1px solid ${shadow};
  margin-right: 30px;
  padding-right: 30px;
  width: 100%;

  &:last-child {
    border-right: none;
    margin-right: 0;
    padding-right: 0;
  }
`;

export const StyledText = styled.span`
  display: block;
  margin-bottom: 10px;
`;

export const StyledDate = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 16px;
  position: absolute;
  right: 200px;
  top: 0px;
`;
