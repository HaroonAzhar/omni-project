import React from "react";

import { H1 } from "components/atoms";

import useNearWaypoints from "./use_near_waypoints";
import NearTable from "./near_table";
import { Span18 } from "../styled_all_waypoints";

const NearWaypointsTable = () => {
  const {
    waypoints7days,
    waypointsToday,
    waypointsOverdue,
  } = useNearWaypoints();
  return (
    <>
      <H1>
        Waypoints within the next week <Span18>(including overdue)</Span18>
      </H1>
      <NearTable
        waypoints7days={waypoints7days}
        waypointsOverdue={waypointsOverdue}
        waypointsToday={waypointsToday}
      />
    </>
  );
};

export default NearWaypointsTable;
