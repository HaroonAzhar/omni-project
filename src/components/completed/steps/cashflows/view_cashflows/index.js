import React from "react";
import styled from "styled-components";

import columns from "./columns";
import { StyledTable } from "../../shared_styles/styled_view";
import useCashflowsData from "./use_cashflows_data";
import mapCashflowsForTable from "./map_cashflows_for_table";

const CashflowTable = styled(StyledTable)`
  min-width: 1000px;
`;

const ViewCashflows = () => {
  const data = useCashflowsData();
  const tableData = mapCashflowsForTable(data) || [];
  return (
    <CashflowTable
      className="view-adjustments-table"
      columns={columns}
      data={tableData}
      shouldShowHeaders={true}
      sortable={true}
    />
  );
};

export default ViewCashflows;
