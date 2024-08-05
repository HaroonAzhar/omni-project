import styled from "styled-components";

import { Table } from "components/molecules";
import { Button } from "components/atoms";

export const ListButton = styled(Button)`
  width: 170px;
`;
export const SecurityWithOutdatedValuation = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SecurityWithOutdatedValuationNo = styled.div`
  padding-right: 15px;
`;

export const AddFurtherWrapper = styled.div`
  width: 500px;
`;

export const ViewFurtherTable = styled(Table)`
  table {
    td {
      padding: 10px 4px 10px 2px;
    }
  }
`;
