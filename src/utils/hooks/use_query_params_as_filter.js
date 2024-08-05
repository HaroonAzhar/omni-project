import { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

const useQueryParamsAsFilter = () => {
  const history = useHistory();
  const location = useLocation();

  const getQueryParamsFromPath = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    return Array.from(queryParams.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
  }, [location.search]);

  const putQueryParamsIntoPath = (values) => {
    const existingParams = getQueryParamsFromPath();
    history.push({
      pathname: location.pathname,
      search: new URLSearchParams({ ...existingParams, ...values }).toString(),
    });
  };

  const clearQueryParamsFromPath = () => {
    const existingParams = getQueryParamsFromPath();
    history.push({
      pathname: location.pathname,
      search: new URLSearchParams({ page: existingParams.page }).toString(),
    });
  };

  const getQueryParamsString = () => location.search;

  const isFilteringApplied = () => {
    const existingParams = getQueryParamsFromPath();
    delete existingParams.page;
    return Object.keys(existingParams).length !== 0;
  };

  return {
    putQueryParamsIntoPath,
    getQueryParamsFromPath,
    clearQueryParamsFromPath,
    getQueryParamsString,
    isFilteringApplied,
  };
};

export default useQueryParamsAsFilter;
