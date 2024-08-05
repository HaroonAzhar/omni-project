import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getWaypoints } from "utils/requests";
import {
  useRequestWithProgressToastRollbar,
  useQueryParamsAsFilter,
} from "utils";
import { insertWaypointsData } from "store/completed/waypoints";

const useWaypointsData = (preFetch) => {
  const { id } = useParams();
  const { getQueryParamsString } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();

  const dispatch = useDispatch();
  const waypoints = useSelector((state) => state.waypoints);
  const getWaypointsRequest = useRequestWithProgressToastRollbar(getWaypoints);

  const fetchWaypointsAndStore = useCallback(() => {
    getWaypointsRequest(id, queryParams).then((waypointsData) =>
      dispatch(insertWaypointsData({ waypoints: waypointsData.data }))
    );
  }, [getWaypointsRequest, id, queryParams, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchWaypointsAndStore();
  }, [fetchWaypointsAndStore, preFetch]);

  return { waypoints, fetchWaypointsAndStore };
};

export default useWaypointsData;
