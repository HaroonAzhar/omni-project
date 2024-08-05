import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { insertEstimatedRedemptionsData } from "store/completed/estimated_redemptions";
import { getEstimatedRedemptions } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

const useEstimatedRedemptionsData = (preFetch) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const estimatedRedemptions = useSelector(
    (state) => state.estimatedRedemptions
  );
  const getEstimatedRedemptionsRequest = useRequestWithProgressToastRollbar(
    getEstimatedRedemptions
  );

  const fetchEstimatedRedemptionsAndStore = useCallback(() => {
    getEstimatedRedemptionsRequest(id).then((res) =>
      dispatch(
        insertEstimatedRedemptionsData({
          estimatedRedemptions: res.data,
        })
      )
    );
  }, [getEstimatedRedemptionsRequest, id, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchEstimatedRedemptionsAndStore();
  }, [preFetch, fetchEstimatedRedemptionsAndStore]);

  return { estimatedRedemptions, fetchEstimatedRedemptionsAndStore };
};

export default useEstimatedRedemptionsData;
