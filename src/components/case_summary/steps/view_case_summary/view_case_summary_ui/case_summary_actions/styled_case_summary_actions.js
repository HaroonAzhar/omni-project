import styled from "styled-components";

export const CaseSummaryActionsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  > button {
    font-size: 14px;

    &:first-child {
      margin-right: 10px;
    }
  }
  > label {
    margin-right: 10px;

    > select {
      font-size: 14px;
    }
  }
`;
