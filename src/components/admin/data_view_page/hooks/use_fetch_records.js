import { useCallback } from "react";

import { useRequestWithProgressToastRollbar } from "utils";
import { getAdminRecords } from "utils/requests/api";

const useFetchRecords = (page) => {
  const fetchRequest = useRequestWithProgressToastRollbar(getAdminRecords);
  return useCallback(() => fetchRequest(page), [page, fetchRequest]);
};

export default useFetchRecords;
