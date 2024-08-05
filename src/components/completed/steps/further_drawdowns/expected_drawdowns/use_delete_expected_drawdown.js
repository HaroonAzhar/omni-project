import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { deleteExpectedDrawdown } from "utils/requests";

const useDeleteExpectedDrawdown = (expectedDrawdownId) => {
  const { id } = useParams();

  const sendDeletingRequest = useRequestWithProgressToastRollbar(
    deleteExpectedDrawdown
  );

  const sendRequest = () => sendDeletingRequest(id, expectedDrawdownId);
  return sendRequest;
};

export default useDeleteExpectedDrawdown;
