import { useHistory } from "react-router-dom";
import { useMemo, useState } from "react";

export const usePagination = () => {
  const { location } = useHistory();
  const [pagination, setPagination] = useState();

  const page = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    const pageParam = parseInt(searchParams.get("page"), 10);

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(pageParam)) {
      return pageParam;
    }

    return 1;
  }, [location]);

  return [page, pagination, setPagination];
};
