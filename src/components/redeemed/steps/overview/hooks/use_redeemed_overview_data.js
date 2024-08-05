import { useSelector } from "react-redux";

import {
  getDateOfCompletion,
  getApplication,
  getCompleted,
} from "../../selectors";
import useCashflowsData from "../../../../completed/steps/cashflows/view_cashflows/use_cashflows_data";

const useRedeemedOverviewData = () => {
  const applicationData = useSelector(getApplication);
  const completedData = useSelector(getCompleted);
  const dateOfCompletion = useSelector(getDateOfCompletion);

  const { statementResults: interestData } = useCashflowsData();
  const { end_balance } = interestData[interestData.length - 1] ?? {};

  const currentBalance = end_balance;

  return {
    applicationData,
    dateOfCompletion,
    currentBalance,
    completedData,
  };
};

export default useRedeemedOverviewData;
