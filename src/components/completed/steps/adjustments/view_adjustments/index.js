import React from "react";

import columns from "./columns";
import useAdjustmentsData from "./use_adjustments_data";
import AdjusmentTable from "../adjustments_table";
import mapAdjustmentsForTable from "./map_adjustments_for_table";

const ViewAdjustments = () => {
  const { adjustments } = useAdjustmentsData(true);

  const adjustmentsData = mapAdjustmentsForTable(adjustments);
  return (
    <AdjusmentTable
      className="view-adjustments-table"
      columns={columns}
      adjustments={adjustmentsData}
    />
  );
};

export default ViewAdjustments;
