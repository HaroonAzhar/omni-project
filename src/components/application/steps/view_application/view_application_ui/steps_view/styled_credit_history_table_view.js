import styled from "styled-components";

export const CreditHistoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 100%;
`;

export const CreditHistoryRow = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  height: 50px;
  padding: 0px;
  padding: 12px;
`;
export const CreditHistoryBlockLeft = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-right: 0px;
  width: 60%;

  > div {
    align-items: center;
    justify-content: flex-end;

    &:first-child {
      height: 51px;
    }
  }
`;
export const CreditHistoryBlockRight = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -13px;
  max-width: 550px;
  mix-width: 380px;
  overflow: hidden;
  overflow-x: auto;
  padding: 10px;
  padding-left: 0px;
  width: 40%;

  > div {
    &:last-child {
      width: 100%;
    }

    > div {
      padding: 0px 10px;
      justify-content: flex-start;
      align-items: center;
    }
  }
  > div:last-child {
    width: 100%;
  }
`;

export const CreditHistoryBlockFull = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  padding-right: 0px;
  width: 100%;

  > div {
    align-items: center;
    justify-content: flex-end;
  }
`;
export const CreditHistoryRowPadding = styled.div`
  padding: 10px;
`;

export const CreditHistoryDetailsRow = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 0px;
  padding: 12px;

  > div:first-child {
    margin: 0px 0px 10px 0px;
  }
  > div:last-child {
  }
`;
