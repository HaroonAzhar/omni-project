import { useEffect, useState } from "react";

import { useQueryParamsAsFilter } from "utils";

import phaseFilterOptions from "../dashboard_table_filters/phase_filter_options";
import statusFilterOptions from "../dashboard_table_filters/status_filter_options";
import { ALL } from "../dashboard_table_filters/user_filter_options";

const setQueryParams = (value, setValue) => {
  if (value) {
    const paramStatus = value.split("_").join(" ");

    setValue(paramStatus);
  } else {
    setValue("");
  }
};

const useSetQueryParams = () => {
  const [selectedPhase, setSelectedPhase] = useState(phaseFilterOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusFilterOptions[0]);
  const [selectedUser, setSelectedUser] = useState(ALL);

  const { getQueryParamsFromPath } = useQueryParamsAsFilter();

  const existingParams = getQueryParamsFromPath();

  useEffect(() => {
    if (Object.keys(existingParams).length === 0) {
      setSelectedStatus(statusFilterOptions[0]);
    } else {
      setQueryParams(existingParams.status, setSelectedStatus);
      setQueryParams(existingParams.phase, setSelectedPhase);
      setQueryParams(existingParams.user, setSelectedUser);
    }
  }, [existingParams]);

  return [
    selectedPhase,
    setSelectedPhase,
    selectedStatus,
    setSelectedStatus,
    selectedUser,
    setSelectedUser,
  ];
};

export default useSetQueryParams;
