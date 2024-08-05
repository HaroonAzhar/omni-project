import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveFurtherAdvance } from "utils/requests";

const useSaveFurtherAdvance = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveFurtherAdvance
  );

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveFurtherAdvance;
