import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveCrossCollateralisedLoan } from "utils/requests";

const useSaveCrossCollateralisedLoan = () => {
  const { id } = useParams();

  const sendSavingRequest = useRequestWithProgressToastRollbar(
    saveCrossCollateralisedLoan
  );

  const sendRequest = (values) => sendSavingRequest(id, values);
  return sendRequest;
};

export default useSaveCrossCollateralisedLoan;
