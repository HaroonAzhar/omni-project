import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { editExpectedDrawdown } from "utils/requests";

const useEditExpectedDrawdown = (expectedDrawdownId) => {
  const { id } = useParams();

  const sendEditingRequest = useRequestWithProgressToastRollbar(
    editExpectedDrawdown
  );

  const sendRequest = (values) =>
    sendEditingRequest(id, expectedDrawdownId, values);
  return sendRequest;
};

export default useEditExpectedDrawdown;
