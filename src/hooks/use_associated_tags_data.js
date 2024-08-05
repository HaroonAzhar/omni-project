import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAssociatedTags } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";
import { insertAssociatedTagsData } from "store/case/associated_tags";

const useAssociatedTagsData = (preFetch) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const associatedTags = useSelector((state) => state.associatedTags);
  const getAssociatedTagsRequest = useRequestWithProgressToastRollbar(
    getAssociatedTags
  );

  const fetchAssociatedTagsAndStore = useCallback(() => {
    getAssociatedTagsRequest(id).then((associatedTagsData) => {
      dispatch(
        insertAssociatedTagsData({ associatedTags: associatedTagsData.data })
      );
    });
  }, [getAssociatedTagsRequest, id, dispatch]);

  useEffect(() => {
    if (!preFetch) return;
    fetchAssociatedTagsAndStore();
  }, [fetchAssociatedTagsAndStore, preFetch]);

  return { associatedTags, fetchAssociatedTagsAndStore };
};

export default useAssociatedTagsData;
