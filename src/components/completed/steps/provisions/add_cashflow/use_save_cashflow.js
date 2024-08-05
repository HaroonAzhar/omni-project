import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveCashflow } from "utils/requests";

const useSaveCashflow = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(saveCashflow);

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveCashflow;
