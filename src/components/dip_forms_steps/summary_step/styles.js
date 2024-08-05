import styled from "styled-components";

export const StyledColumnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledCellGroup = styled.div`
  padding-bottom: 40px;
  padding-left: 30px;

  & > div > div:last-child {
    margin-left: -30px;
  }
`;
