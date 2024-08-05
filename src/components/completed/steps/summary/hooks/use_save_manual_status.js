import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveManualStatus, deleteManualStatus } from "utils/requests";

const useManualStatus = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveManualStatus
  );

  const sendDeleteRequest = useRequestWithProgressToastRollbar(
    deleteManualStatus
  );

  const savingRequest = (values) => sendSavingRequest(id, values);
  const deletingRequest = (deleteId) => sendDeleteRequest(id, deleteId);

  return { savingRequest, deletingRequest };
};

export default useManualStatus;
