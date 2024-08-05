import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { insertFurtherDrawdownsData } from "store/completed/further_drawdowns";
import { getFurtherDrawdowns } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

const useFurtherDrawdownsData = (preFetch) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const furtherDrawdowns = useSelector((state) => state.furtherDrawdowns);
  const getFurtherDrawdownsRequest = useRequestWithProgressToastRollbar(
    getFurtherDrawdowns
  );

  const fetchFurtherDrawdownsAndStore = useCallback(() => {
    getFurtherDrawdownsRequest(id).then((res) =>
      dispatch(
        insertFurtherDrawdownsData({
          furtherDrawdowns: res.data,
        })
      )
    );
  }, [getFurtherDrawdownsRequest, id, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchFurtherDrawdownsAndStore();
  }, [preFetch, fetchFurtherDrawdownsAndStore]);

  return { furtherDrawdowns, fetchFurtherDrawdownsAndStore };
};

export default useFurtherDrawdownsData;
