import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveFurtherDrawdown } from "utils/requests";

const useSaveFurtherDrawdown = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveFurtherDrawdown
  );

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveFurtherDrawdown;
