import { useParams } from "react-router";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveSecurityNote } from "utils/requests";

const useSaveSecurityNote = (security) => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveSecurityNote
  );

  const sendRequest = (values) =>
    sendSavingRequest(id, security.SecurityId, values);
  return sendRequest;
};

export default useSaveSecurityNote;
