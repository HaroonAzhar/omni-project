import styled from "styled-components";

export const LandChargesWrapper = styled.div`
  display: flex;
`;

export const ResultsWrapper = styled.div`
  > div {
    border-bottom: 2px dashed black;
  }
  > div:last-child {
    border-bottom: none;
  }
`;

export const ChecklistRowWrapper = styled.div`
  border-bottom: 1px black solid;
  display: flex;
  flex-direction: row;
  & div {
    margin: auto 0px;
    padding: 3px;
  }
`;

export const ChecklistRowTitle = styled.div`
  width: 100px;
`;

export const ChecklistRowDescription = styled.div`
  width: 350px;
`;

export const ChecklistHeaderContent = styled.div`
  & div {
    font-weight: bolder;
  }
`;

export const ChecklistRowSignature = styled.div`
  width: 250px;
`;

export const ChecklistRowChildren = styled.div`
  max-width: 500px;
`;

export const ChecklistActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ChecklistActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5px;
  width: 25%;
`;
