import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveExtension } from "utils/requests";

const useSaveExtension = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(saveExtension);

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveExtension;
