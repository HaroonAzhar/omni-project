import { useEffect } from "react";
import { useSelector } from "react-redux";

import useFetchRecordsAndPutIntoStore from "./use_fetch_records_and_put_into_store";

const useRecords = (page) => {
  const records = useSelector((state) => state.admin[page]) || [];
  const fetchRecordsAndPutIntoStore = useFetchRecordsAndPutIntoStore(page);
  useEffect(() => {
    fetchRecordsAndPutIntoStore();
  }, [fetchRecordsAndPutIntoStore]);
  return [records];
};

export default useRecords;
