import { useSelector } from "react-redux";

import useFurtherData from "../further/use_further_data";
import useFurtherDrawdownsData from "./use_further_drawdowns_data";

const useAllFurtherDrawdownsData = () => {
  const { availableDrawdownFunds } = useSelector((state) => state.completed);

  const {
    furtherDrawdowns,
    fetchFurtherDrawdownsAndStore,
  } = useFurtherDrawdownsData(true);

  const {
    openAdd,
    closeAdd,
    addModalVisible,
    latestStatement,
    totalGDV,
    totalValuations,
    securities,
  } = useFurtherData(fetchFurtherDrawdownsAndStore);

  return {
    availableDrawdownFunds,
    furtherDrawdowns,
    openAdd,
    closeAdd,
    addDrawdownModalVisible: addModalVisible,
    latestStatement,
    securities,
    totalGDV,
    totalValuations,
    fetchFurtherDrawdownsAndStore,
  };
};

export default useAllFurtherDrawdownsData;
