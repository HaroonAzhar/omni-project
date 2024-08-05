import React from "react";

import columns from "./columns";
import useCashflowsData from "./use_cashflows_data";
import { StyledTable } from "../../shared_styles/styled_view";

const ViewCashflows = () => {
  const { cashflows: cashflowsData } = useCashflowsData(true);

  return (
    <StyledTable
      className="view-cashflows-table"
      columns={columns}
      data={cashflowsData}
      shouldShowHeaders={true}
      sortable={true}
    />
  );
};

export default ViewCashflows;
