import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { editEstimatedRedemption } from "utils/requests";

const useEditEstimatedRedemption = (estimatedRedemptionId) => {
  const { id } = useParams();

  const sendEditingRequest = useRequestWithProgressToastRollbar(
    editEstimatedRedemption
  );

  const sendRequest = (values) =>
    sendEditingRequest(id, estimatedRedemptionId, values);
  return sendRequest;
};

export default useEditEstimatedRedemption;
