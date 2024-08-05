import styled from "styled-components";

import { Button } from "components/atoms";
import { Table } from "components/molecules";

export const ListButton = styled(Button)`
  width: 170px;
`;

export const ViewFurtherDrawdownsTable = styled(Table)`
  table {
    td {
      padding: 10px 4px 10px 2px;
    }
  }
`;
