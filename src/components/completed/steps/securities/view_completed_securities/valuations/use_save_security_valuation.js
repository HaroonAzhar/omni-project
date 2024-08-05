import { useParams } from "react-router";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveSecurityValuation } from "utils/requests";

const useSaveSecurityValuation = (security) => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveSecurityValuation
  );

  const sendRequest = (values) =>
    sendSavingRequest(id, security.SecurityId, values);
  return sendRequest;
};

export default useSaveSecurityValuation;
