import React from "react";

import { H1 } from "components/atoms";
import CasesTable from "components/pages/dashboard/dashboard_table/cases_table";

import {
  WaypointsContainer,
  WaypointsContainerLeft,
  WaypointsContainerRight,
  WaypointsContainerShadow,
} from "./styled_all_waypoints";
import AllWaypointsTable from "./all_waypoints_table";
import NearWaypointsTable from "./near_waypoints";

const AllWaypoints = () => {
  return (
    <WaypointsContainer>
      <WaypointsContainerLeft>
        <WaypointsContainerShadow>
          <NearWaypointsTable />
        </WaypointsContainerShadow>
        <WaypointsContainerShadow>
          <AllWaypointsTable />
        </WaypointsContainerShadow>
      </WaypointsContainerLeft>
      <WaypointsContainerRight>
        <WaypointsContainerShadow>
          <H1>Cases</H1>
          <CasesTable
            selectedStage="Completed"
            selectedStatus="Active"
            page="waypoints"
          />
        </WaypointsContainerShadow>
      </WaypointsContainerRight>
    </WaypointsContainer>
  );
};

export default AllWaypoints;
