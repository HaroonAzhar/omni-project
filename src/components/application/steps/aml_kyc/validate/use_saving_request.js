import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveAmlKycValidation } from "utils/requests";

const useSavingRequest = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveAmlKycValidation
  );

  const sendRequest = (amlKycValidation) => {
    return sendSavingRequest(id, amlKycValidation);
  };
  return sendRequest;
};

export default useSavingRequest;
