import React from "react";

import theme from "core/theme";

import columns from "./columns";
import useWaypointsData from "./use_waypoints_data";
import { StyledTable } from "../../shared_styles/styled_view";
import mapWaypointsForTable from "./map_waypoints_for_table";

const formatRowConditionally = (row) => {
  const isDueToday =
    new Date(row.original.DueDate).setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0);
  const isOverdue =
    row.original.IsCompleted === false &&
    new Date(row.original.DueDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0);
  return {
    style: {
      color: isOverdue ? theme.colors.red : theme.colors.main,
      fontWeight: isDueToday || isOverdue ? "bold" : "normal",
    },
  };
};

const ViewWaypoints = () => {
  const { waypoints } = useWaypointsData(true);
  const waypointsData = mapWaypointsForTable(waypoints);
  return (
    <StyledTable
      className="view-waypoints-table"
      columns={columns}
      data={waypointsData}
      shouldShowHeaders={true}
      sortable={true}
      getRowProps={formatRowConditionally}
    />
  );
};

export default ViewWaypoints;
