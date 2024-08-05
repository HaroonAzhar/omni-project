import React from "react";

import columns from "./columns";
import useManualStatusesData from "./use_manual_statuses_data";
import { StyledTable } from "../../shared_styles/styled_view";
import mapManualStatusesForTable from "./map_manual_statuses_for_table";

const ViewManualStatuses = () => {
  const { manualStatuses } = useManualStatusesData(true);
  const manualStatusesData = mapManualStatusesForTable(manualStatuses);
  return (
    <StyledTable
      className="view-manual-statuses-table"
      columns={columns}
      data={manualStatusesData}
      shouldShowHeaders={true}
      sortable={true}
    />
  );
};

export default ViewManualStatuses;
