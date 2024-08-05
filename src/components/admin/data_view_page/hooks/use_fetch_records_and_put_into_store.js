import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { addAdminRecords } from "store/admin";

import useFetchRecords from "./use_fetch_records";

const useFetchRecordsAndPutIntoStore = (page) => {
  const dispatch = useDispatch();
  const setRecords = useCallback(
    (records) => {
      dispatch(addAdminRecords({ page, records }));
    },
    [page, dispatch]
  );
  const fetchRequest = useFetchRecords(page);

  return useCallback(
    () =>
      fetchRequest().then((res) => {
        setRecords((res && res.data) || []);
      }),
    [fetchRequest, setRecords]
  );
};

export default useFetchRecordsAndPutIntoStore;
