import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { insertCrossCollateralisedLoansData } from "store/case/cross_collateralised_loans";
import { getCrossCollateralisedLoans } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

const useCrossCollateralisedLoansData = (preFetch) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const crossCollateralisedLoans = useSelector(
    (state) => state.crossCollateralisedLoans
  );
  const getCrossCollateralisedLoansRequest = useRequestWithProgressToastRollbar(
    getCrossCollateralisedLoans
  );

  const fetchCrossCollateralisedLoansAndStore = useCallback(() => {
    getCrossCollateralisedLoansRequest(id).then((res) =>
      dispatch(
        insertCrossCollateralisedLoansData({
          crossCollateralisedLoans: res.data,
        })
      )
    );
  }, [getCrossCollateralisedLoansRequest, id, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchCrossCollateralisedLoansAndStore();
  }, [preFetch, fetchCrossCollateralisedLoansAndStore]);

  return { crossCollateralisedLoans, fetchCrossCollateralisedLoansAndStore };
};

export default useCrossCollateralisedLoansData;
