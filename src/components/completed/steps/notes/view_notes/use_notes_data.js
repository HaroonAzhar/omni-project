import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getNotes } from "utils/requests";
import {
  useRequestWithProgressToastRollbar,
  useQueryParamsAsFilter,
} from "utils";
import { insertNotesData } from "store/completed/notes";

const useNotesData = () => {
  const { id } = useParams();
  const { getQueryParamsString } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const getNotesRequest = useRequestWithProgressToastRollbar(getNotes);

  const fetchNotesAndStore = useCallback(() => {
    getNotesRequest(id, queryParams).then((notesData) =>
      dispatch(insertNotesData({ notes: notesData.data }))
    );
  }, [getNotesRequest, id, queryParams, dispatch]);

  useEffect(() => {
    fetchNotesAndStore();
  }, [fetchNotesAndStore]);

  return { notes, fetchNotesAndStore };
};

export default useNotesData;
