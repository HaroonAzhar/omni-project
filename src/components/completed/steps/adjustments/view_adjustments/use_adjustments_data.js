import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAdjustments } from "utils/requests";
import {
  useRequestWithProgressToastRollbar,
  useQueryParamsAsFilter,
} from "utils";
import { insertAdjustmentsData } from "store/completed/adjustments";

import signedAmount from "../helpers/signed_amount";

const mapSingleAdjustment = (adjustment) => ({
  signedAmount: signedAmount(adjustment, adjustment.amount),
  ...adjustment,
});

const useAdjustmentsData = (preFetch = true) => {
  const { id } = useParams();
  const { getQueryParamsString } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();

  const dispatch = useDispatch();
  const adjustments = useSelector((state) => state.adjustments);
  const getAdjustmentsRequest = useRequestWithProgressToastRollbar(
    getAdjustments
  );

  const fetchAdjustmentsAndStore = useCallback(() => {
    getAdjustmentsRequest(id, queryParams).then((adjustmentsData) =>
      dispatch(
        insertAdjustmentsData({
          adjustments: adjustmentsData.data.map(mapSingleAdjustment),
        })
      )
    );
  }, [getAdjustmentsRequest, id, queryParams, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchAdjustmentsAndStore();
  }, [preFetch, fetchAdjustmentsAndStore]);

  return { adjustments, fetchAdjustmentsAndStore };
};

export default useAdjustmentsData;
