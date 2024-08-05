import React, { useState } from "react";

import { useQueryParamsAsFilter } from "utils";

import DashboardTableFilters from "./dashboard_table_filters";
import useSetQueryParams from "./hooks/use_set_query_params";
import CasesTable from "./cases_table";

const DashboardTable = () => {
  const { getQueryParamsFromPath } = useQueryParamsAsFilter();

  const existingParams = getQueryParamsFromPath();

  const [searchingString, setSearchingString] = useState();

  const updateSearchString = (string) => {
    setSearchingString(string);
  };

  const [
    selectedPhase,
    setSelectedPhase,
    selectedStatus,
    setSelectedStatus,
    selectedUser,
    setSelectedUser,
  ] = useSetQueryParams();

  return (
    <>
      <DashboardTableFilters
        existingParams={existingParams}
        selectedStatus={selectedStatus}
        selectedPhase={selectedPhase}
        setSelectedStatus={setSelectedStatus}
        setSelectedPhase={setSelectedPhase}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        updateSearchString={updateSearchString}
        searchingString={searchingString}
      />

      <CasesTable
        searchingString={searchingString}
        selectedStage={selectedPhase}
        selectedStatus={selectedStatus}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default DashboardTable;
