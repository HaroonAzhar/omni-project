import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCompletedSecurities } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";
import { insertSecuritiesData } from "store/completed/securities";

const useCompletedSecuritiesData = (preFetch = false) => {
  const { id } = useParams();

  const getSecuritiesRequest = useRequestWithProgressToastRollbar(
    getCompletedSecurities
  );

  const dispatch = useDispatch();
  const securities = useSelector((state) => state.securities);
  const fetchSecuritiesAndStore = useCallback(() => {
    getSecuritiesRequest(id).then((securitiesData) => {
      dispatch(
        insertSecuritiesData({
          securities: securitiesData.data,
        })
      );
    });
  }, [dispatch, getSecuritiesRequest, id]);

  useEffect(() => {
    if (!preFetch) return;
    fetchSecuritiesAndStore();
  }, [fetchSecuritiesAndStore, preFetch]);

  return {
    securities,
    fetchSecuritiesAndStore,
  };
};

export default useCompletedSecuritiesData;
