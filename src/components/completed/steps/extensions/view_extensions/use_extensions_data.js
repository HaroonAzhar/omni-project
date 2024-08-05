import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getExtensions } from "utils/requests";
import {
  useRequestWithProgressToastRollbar,
  useQueryParamsAsFilter,
} from "utils";

const useExtensionsData = (preFetch = false) => {
  const { id } = useParams();
  const { getQueryParamsString } = useQueryParamsAsFilter();
  const queryParams = getQueryParamsString();
  const [extensions, setExtensions] = useState([]);

  const getExtensionsRequest = useRequestWithProgressToastRollbar(
    getExtensions
  );

  const fetchExtensionsAndStore = useCallback(() => {
    getExtensionsRequest(id, queryParams).then((extensionsData) => {
      setExtensions(extensionsData.data);
    });
  }, [getExtensionsRequest, id, queryParams]);

  useEffect(() => {
    if (!preFetch) return;
    fetchExtensionsAndStore();
  }, [fetchExtensionsAndStore, preFetch]);

  return { extensions, fetchExtensionsAndStore };
};

export default useExtensionsData;
