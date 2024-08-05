import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { deleteCrossCollateralisedLoan } from "utils/requests";

const useDeleteCrossCollateralisedLoan = (crossCollateralisedLoanId) => {
  const { id } = useParams();

  const sendDeletingRequest = useRequestWithProgressToastRollbar(
    deleteCrossCollateralisedLoan
  );

  const sendRequest = () => sendDeletingRequest(id, crossCollateralisedLoanId);
  return sendRequest;
};

export default useDeleteCrossCollateralisedLoan;
