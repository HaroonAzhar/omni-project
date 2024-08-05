import { useParams } from "react-router";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveSecurityConversion } from "utils/requests";

const useSaveSecurityConversion = (security) => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveSecurityConversion
  );

  const sendRequest = (values) =>
    sendSavingRequest(id, security.SecurityId, values);
  return sendRequest;
};

export default useSaveSecurityConversion;
