import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveEstimatedRedemption } from "utils/requests";

const useSaveEstimatedRedemption = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveEstimatedRedemption
  );

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveEstimatedRedemption;
