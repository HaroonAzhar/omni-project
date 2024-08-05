import styled from "styled-components";

const getBorderColor = ({ theme }) => theme.colors.lightGrey;

export const Table = styled.table`
  border: 1px solid ${getBorderColor};
  border-radius: 8px;
  box-sizing: border-box;
  width: 48%;

  td {
    border-left: 1px solid ${getBorderColor};
    border-right: 1px solid ${getBorderColor};
    line-height: 36px;
    padding: 0 10px;
  }
`;

export const Tr = styled.tr`
  border-top: 1px solid ${getBorderColor};

  ${({ nested }) =>
    nested &&
    `
      border-top: 0;

      td {
        padding-left: 3em;
      }
    `}
`;

export const Td = styled.td`
  &:last-child {
    text-align: right;
  }
`;
