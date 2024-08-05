import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { insertExpectedDrawdownsData } from "store/completed/expected_drawdowns";
import { getExpectedDrawdowns } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

const useExpectedDrawdownsData = (preFetch) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const expectedDrawdowns = useSelector((state) => state.expectedDrawdowns);
  const getExpectedDrawdownsRequest = useRequestWithProgressToastRollbar(
    getExpectedDrawdowns
  );

  const fetchExpectedDrawdownsAndStore = useCallback(() => {
    getExpectedDrawdownsRequest(id).then((res) =>
      dispatch(
        insertExpectedDrawdownsData({
          expectedDrawdowns: res.data,
        })
      )
    );
  }, [getExpectedDrawdownsRequest, id, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchExpectedDrawdownsAndStore();
  }, [preFetch, fetchExpectedDrawdownsAndStore]);

  return { expectedDrawdowns, fetchExpectedDrawdownsAndStore };
};

export default useExpectedDrawdownsData;
