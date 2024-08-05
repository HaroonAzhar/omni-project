import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveDefaultEvent } from "utils/requests";

const useSaveDefaultEvent = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveDefaultEvent
  );

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveDefaultEvent;
