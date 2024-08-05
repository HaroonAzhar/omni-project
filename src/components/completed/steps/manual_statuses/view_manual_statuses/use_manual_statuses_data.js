import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getManualStatuses } from "utils/requests";
import {
  useRequestWithProgressToastRollbar,
  useQueryParamsAsFilter,
} from "utils";

const useManualStatusesData = (preFetch = false) => {
  const { id } = useParams();
  const { getQueryParamsString } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();
  const [manualStatuses, setManualStatuses] = useState([]);

  const getManualStatusesRequest = useRequestWithProgressToastRollbar(
    getManualStatuses
  );

  const fetchManualStatusesAndStore = useCallback(() => {
    getManualStatusesRequest(id, queryParams).then((manualStatusesData) => {
      setManualStatuses(manualStatusesData.data);
    });
  }, [getManualStatusesRequest, id, queryParams]);

  useEffect(() => {
    if (!preFetch) return;
    fetchManualStatusesAndStore();
  }, [fetchManualStatusesAndStore, preFetch]);

  return {
    manualStatuses,
    fetchManualStatusesAndStore,
  };
};

export default useManualStatusesData;
