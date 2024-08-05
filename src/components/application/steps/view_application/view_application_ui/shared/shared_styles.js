import styled from "styled-components";

import { Button } from "components/atoms";

export const LabelStyle = styled.p`
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
`;

export const CopyStyle = styled.div`
  padding-bottom: 8px;
`;
export const CopyBoldStyle = styled.div`
  font-weight: bold;
  padding-bottom: 8px;
`;

export const AddressWrapper = styled.div`
  display: flex;
  padding: 0px;
`;
export const ColumnSplitWrapper = styled.div`
  display: flex;
  padding: 0px;
`;
export const ColumnSplitWrapperCenter = styled.div`
  display: flex;
  padding: 0px;

  > div {
    width: 50%;
  }
  > div:first-of-type {
    text-align: right;
  }
`;

export const StyledApplicantContent = styled.div`
  padding: 10px;
  ${({ expanded }) => !expanded && "display: none;"}
`;

export const DirectorsShareholdersWrapper = styled.div`
  margin: 0px 0px 40px 0px;
`;

export const TableColTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div:first-child {
    width: 70%;
  }
  > div:last-child {
    width: 30%;
  }
`;

export const RowFull = styled.div`
  margin: 0px 0px 10px 20px;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  align-items: baseline;
  background-color: white;
  border: 0px solid black;
  color: black;
  font-size: 20px;
  height: auto;
  margin: 0px 0px 16px 0px;
  min-width: 0px;
  padding: 0px;
  width: auto;

  :hover {
    background-color: white;
    border: 0px solid black;
    color: black;
  }
  :focus {
    background-color: white;
    border: 0px solid black;
    color: black;
  }

  ${({ expanded }) => expanded && "font-weight:bold;padding-bottom: 0px;"}
`;
export const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  > button {
    bottom: -44px;
    position: absolute;
    right: -29px;
  }
`;
