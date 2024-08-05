import styled from "styled-components";

export const PageContainer = styled.div`
  margin: auto;
  max-width: 1120px;
  padding: 50px 0;
`;

export const Paper = styled.div`
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 30px;
`;

export const PanelItemContainer = styled.div`
  padding-bottom: 6px;
  padding-top: 60px;
`;

export const StyledTable = styled.table`
  font-size: ${({ theme }) => theme.fonts.size};
  margin-bottom: 30px;
  width: 100%;

  td:first-child,
  th: first-child {
    padding-left: 20px;
  }

  td:last-child,
  th: last-child {
    padding-right: 20px;
  }
`;

export const StyledTr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  th {
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 30px 0;
  }
`;
