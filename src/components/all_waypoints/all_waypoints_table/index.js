import React from "react";

import { H1 } from "components/atoms";
import { Table } from "components/molecules";
import Pagination from "components/pagination";
import FilterModal from "components/completed/steps/waypoints/filter_waypoints";

import columns from "../columns";
import useAllWaypointsWithPagination from "./use_all_waypoints_with_pagination";
import { AllWaypointsTitle } from "./styled_all_waypoints_table";

const AllWaypointsTable = () => {
  const {
    waypoints,
    paginationData,
    handlePageClick,
  } = useAllWaypointsWithPagination();
  return (
    <>
      <AllWaypointsTitle>
        <H1>All Waypoints</H1>
        <FilterModal />
      </AllWaypointsTitle>
      <Table
        columns={columns}
        data={waypoints}
        shouldShowHeaders={true}
        sortable={true}
        className="waypoint_table"
      />
      <Pagination data={paginationData} handlePageClick={handlePageClick} />
    </>
  );
};

export default AllWaypointsTable;
