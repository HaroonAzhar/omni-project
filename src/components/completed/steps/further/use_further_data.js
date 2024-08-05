import { useState } from "react";

import useCashflowsData from "../cashflows/view_cashflows/use_cashflows_data";
import useCompletedSecuritiesData from "../securities/view_completed_securities/use_completed_securities_data";

const useFurtherData = (fetchFurtherAndStore) => {
  const { securities } = useCompletedSecuritiesData(true);

  const totalValuations = securities.reduce(
    (total, security) => total + security.currentValuation,
    0
  );
  const totalGDV = securities.reduce(
    (total, security) => total + security.currentGDV,
    0
  );

  const { statementResults } = useCashflowsData({ totalValuations, totalGDV });
  const latestStatement = statementResults[statementResults.length - 1];

  const [addModalVisible, setAddModalVisible] = useState(false);

  const closeAdd = () => {
    setAddModalVisible(false);
    fetchFurtherAndStore();
  };
  const openAdd = () => setAddModalVisible(true);

  return {
    openAdd,
    closeAdd,
    addModalVisible,
    latestStatement,
    securities,
    totalGDV,
    totalValuations,
  };
};

export default useFurtherData;
