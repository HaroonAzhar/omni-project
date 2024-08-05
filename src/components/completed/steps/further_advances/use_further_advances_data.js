import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { insertFurtherAdvancesData } from "store/completed/further_advances";
import { getFurtherAdvances } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

const useFurtherAdvancesData = (preFetch) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const furtherAdvances = useSelector((state) => state.furtherAdvances);
  const getFurtherAdvancesRequest = useRequestWithProgressToastRollbar(
    getFurtherAdvances
  );

  const fetchFurtherAdvancesAndStore = useCallback(() => {
    getFurtherAdvancesRequest(id).then((res) =>
      dispatch(
        insertFurtherAdvancesData({
          furtherAdvances: res.data,
        })
      )
    );
  }, [getFurtherAdvancesRequest, id, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchFurtherAdvancesAndStore();
  }, [preFetch, fetchFurtherAdvancesAndStore]);

  return { furtherAdvances, fetchFurtherAdvancesAndStore };
};

export default useFurtherAdvancesData;
