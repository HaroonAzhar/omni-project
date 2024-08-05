import { useRequestWithProgressToastRollbar } from "utils";
import { saveAdminRecord, deleteAdminRecord } from "utils/requests/api";

import useFetchRecordsAndPutIntoStore from "../../hooks/use_fetch_records_and_put_into_store";

const useStorageControls = ({
  page,
  dataRecord,
  onStorageFinished = () => {},
}) => {
  const sendInitialRequest = useFetchRecordsAndPutIntoStore(page);

  const savingRequest = useRequestWithProgressToastRollbar(
    saveAdminRecord,
    "Saving record"
  );
  const deletingRequest = useRequestWithProgressToastRollbar(
    deleteAdminRecord,
    "Deleting record"
  );

  const requestAndRefresh = (request) => (...args) =>
    request(page, dataRecord.Id, ...args).then((res) => {
      if (!res) {
        return;
      }
      sendInitialRequest();
      onStorageFinished(res);
      return res;
    });
  const onSubmit = requestAndRefresh(savingRequest);
  const onDelete = requestAndRefresh(deletingRequest);
  return { onSubmit, onDelete };
};

export default useStorageControls;
