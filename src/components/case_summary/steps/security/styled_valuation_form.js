import styled from "styled-components";

import { Table } from "components/molecules";

export const StyledTable = styled(Table)`
  & tbody tr:last-child {
    border-top: 2px solid ${({ theme }) => theme.colors.darkGrey};
  }
`;
