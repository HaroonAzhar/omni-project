import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDefaultEventsPeriods } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

const useDefaultEventsPeriods = (preFetch = false) => {
  const { id } = useParams();

  const getDefaultEventsPeriodsRequest = useRequestWithProgressToastRollbar(
    getDefaultEventsPeriods
  );
  const [defaultEventsPeriods, setDefaultEventsPeriods] = useState([]);

  const fetchDefaultEventsPeriodsAndStore = useCallback(() => {
    getDefaultEventsPeriodsRequest(id).then((defaultEventsPeriodsData) => {
      setDefaultEventsPeriods(defaultEventsPeriodsData.data);
    });
  }, [getDefaultEventsPeriodsRequest, id]);

  useEffect(() => {
    if (!preFetch) return;
    fetchDefaultEventsPeriodsAndStore();
  }, [fetchDefaultEventsPeriodsAndStore, preFetch]);
  return { defaultEventsPeriods, fetchDefaultEventsPeriodsAndStore };
};

export default useDefaultEventsPeriods;
