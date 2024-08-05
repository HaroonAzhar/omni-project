import styled from "styled-components";

export const RedeemedActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

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
