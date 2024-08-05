import { useParams } from "react-router";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveSecurityRelease } from "utils/requests";

const useSaveSecurityRelease = (security) => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveSecurityRelease
  );

  const sendRequest = (values) =>
    sendSavingRequest(id, security.SecurityId, values);
  return sendRequest;
};

export default useSaveSecurityRelease;
