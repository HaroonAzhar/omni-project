import styled from "styled-components";

export const WaypointsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
  padding-bottom: 40px;
  padding-top: 10px;

  > div {
    flex-direction: column;
    width: 49%;
  }
`;

export const WaypointsContainerShadow = styled.div`
  box-shadow: 2px 2px 8px -3px #888888;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 10px;

  > table {
    > thead {
      > tr {
        > th {
          font-size: 12px;
          padding: 10px;
        }
      }
    }
    > tbody {
      > tr {
        > td {
          font-size: 12px;
          padding: 10px;
        }
      }
    }
  }
`;

export const WaypointsContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WaypointsContainerRight = styled.div`
  display: flex;

  > div {
    display: flex;
    width: 100%;
  }
`;

export const Span18 = styled.span`
  font-size: 18px;
`;
