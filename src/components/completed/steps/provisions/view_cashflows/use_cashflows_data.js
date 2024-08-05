import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCashflows } from "utils/requests";
import {
  useRequestWithProgressToastRollbar,
  useQueryParamsAsFilter,
} from "utils";
import { insertCashflowsData } from "store/completed/cashflows";

import mapCashflowsForTable from "./map_cashflows_for_table";

const useCashflowsData = (preFetch) => {
  const { id } = useParams();
  const { getQueryParamsString } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();

  const dispatch = useDispatch();
  const cashflows = useSelector((state) => state.cashflows);
  const getCashflowsRequest = useRequestWithProgressToastRollbar(getCashflows);

  const fetchCashflowsAndStore = useCallback(() => {
    getCashflowsRequest(id, queryParams).then((cashflowsData) =>
      dispatch(
        insertCashflowsData({
          cashflows: mapCashflowsForTable(cashflowsData.data),
        })
      )
    );
  }, [getCashflowsRequest, id, queryParams, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchCashflowsAndStore();
  }, [preFetch, fetchCashflowsAndStore]);

  return { cashflows, fetchCashflowsAndStore };
};

export default useCashflowsData;
