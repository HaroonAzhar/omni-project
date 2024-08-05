import React from "react";

import DeleteWaypoint from "./delete_waypoint";
import IsCompletedWaypoint from "./is_completed_waypoint";
import EditWaypoint from "./update_waypoint";

const mapSingleWaypoint = (waypoint) => ({
  ...waypoint,
  Name: `${waypoint.Name}${
    waypoint.OtherWaypointDescription
      ? ` - ${waypoint.OtherWaypointDescription}`
      : ""
  }`,
  delete: <DeleteWaypoint waypoint={waypoint} />,
  isCompleted: <IsCompletedWaypoint waypoint={waypoint} />,
  edit: <EditWaypoint waypoint={waypoint} />,
});

const mapWaypointsForTable = (waypointsData) => {
  return waypointsData.map(mapSingleWaypoint);
};

export default mapWaypointsForTable;
