import { useParams } from "react-router";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveNewCompletedSecurity } from "utils/requests";

const useSaveNewSecurity = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveNewCompletedSecurity
  );

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveNewSecurity;
