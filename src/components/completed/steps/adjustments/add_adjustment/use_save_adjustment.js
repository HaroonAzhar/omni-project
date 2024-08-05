import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveAdjustment } from "utils/requests";

const useSaveAdjustment = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(saveAdjustment);

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveAdjustment;
