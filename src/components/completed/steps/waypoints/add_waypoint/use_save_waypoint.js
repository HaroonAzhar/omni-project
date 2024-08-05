import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveWaypoint } from "utils/requests";

const useSaveWaypoint = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(saveWaypoint);

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveWaypoint;
