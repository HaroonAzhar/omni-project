import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { deleteEstimatedRedemption } from "utils/requests";

const useDeleteEstimatedRedemption = (estimatedRedemptionId) => {
  const { id } = useParams();

  const sendDeletingRequest = useRequestWithProgressToastRollbar(
    deleteEstimatedRedemption
  );

  const sendRequest = () => sendDeletingRequest(id, estimatedRedemptionId);
  return sendRequest;
};

export default useDeleteEstimatedRedemption;
