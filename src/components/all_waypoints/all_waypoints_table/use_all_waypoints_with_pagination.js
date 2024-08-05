import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  useQueryParamsAsFilter,
  useRequestWithProgressToastRollbar,
} from "utils";
import { getAllWaypoints } from "utils/requests";
import { usePagination } from "components/pagination";

const LIMIT = 5;

const useAllWaypointsWithPagination = () => {
  const fetchWaypoints = useRequestWithProgressToastRollbar(getAllWaypoints);
  const [waypoints = [], setWaypoints] = useState([]);

  const { push } = useHistory();
  const location = useLocation();
  const [page, paginationData, setPaginationData] = usePagination();

  const {
    getQueryParamsString,
    getQueryParamsFromPath,
  } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();

  useEffect(() => {
    const existingParams = getQueryParamsFromPath();
    if (existingParams.page) {
      const requestParams = `${
        queryParams ? queryParams : `?page=${page}`
      }&limit=${LIMIT}`;
      fetchWaypoints(requestParams).then(({ data: res } = {}) => {
        const { data, pagination: responsePagination } = res;
        setPaginationData(responsePagination);
        setWaypoints(data);
      });
    } else {
      push({
        pathname: location.pathname,
        search: new URLSearchParams({
          IsCompleted: false,
          page: 1,
        }).toString(),
      });
    }
  }, [
    fetchWaypoints,
    queryParams,
    setPaginationData,
    page,
    push,
    getQueryParamsFromPath,
    location.pathname,
  ]);

  const handlePageClick = useCallback(
    (newPage) => {
      const existingParams = getQueryParamsFromPath();

      push({
        pathname: location.pathname,
        search: new URLSearchParams({
          ...existingParams,
          page: newPage,
        }).toString(),
      });
    },
    [push, location, getQueryParamsFromPath]
  );
  return {
    waypoints,
    paginationData,
    handlePageClick,
  };
};

export default useAllWaypointsWithPagination;
