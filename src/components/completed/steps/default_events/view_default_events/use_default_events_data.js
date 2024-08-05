import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getDefaultEvents } from "utils/requests";
import {
  useRequestWithProgressToastRollbar,
  useQueryParamsAsFilter,
} from "utils";
import { insertDefaultEventsData } from "store/completed/default_events";

const useDefaultEventsData = (preFetch = false) => {
  const { id } = useParams();
  const { getQueryParamsString } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();

  const getDefaultEventsRequest = useRequestWithProgressToastRollbar(
    getDefaultEvents
  );
  const dispatch = useDispatch();
  const defaultEvents = useSelector((state) => state.defaultEvents);

  const fetchDefaultEventsAndStore = useCallback(() => {
    getDefaultEventsRequest(id, queryParams).then((defaultEventsData) => {
      dispatch(
        insertDefaultEventsData({ defaultEvents: defaultEventsData.data })
      );
    });
  }, [getDefaultEventsRequest, id, queryParams, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchDefaultEventsAndStore();
  }, [fetchDefaultEventsAndStore, preFetch]);

  return { defaultEvents, fetchDefaultEventsAndStore };
};

export default useDefaultEventsData;
