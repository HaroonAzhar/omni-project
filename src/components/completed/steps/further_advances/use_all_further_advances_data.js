import { useSelector } from "react-redux";

import useFurtherData from "../further/use_further_data";
import useFurtherAdvancesData from "./use_further_advances_data";

const useAllFurtherAdvancesData = () => {
  const { TotalLoanFacility } = useSelector((state) => state.dip);

  const {
    furtherAdvances,
    fetchFurtherAdvancesAndStore,
  } = useFurtherAdvancesData(true);

  const {
    openAdd,
    closeAdd,
    addModalVisible,
    latestStatement,
    totalGDV,
    totalValuations,
    securities,
  } = useFurtherData(fetchFurtherAdvancesAndStore);

  return {
    TotalLoanFacility,
    furtherAdvances,
    openAdd,
    closeAdd,
    addAdvanceModalVisible: addModalVisible,
    latestStatement,
    securities,
    totalGDV,
    totalValuations,
    fetchFurtherAdvancesAndStore,
  };
};

export default useAllFurtherAdvancesData;
