import { useEffect } from "react";

import useInitialRequest from "./use_initial_request";

export default (showInfoBox, reFetch) => {
  const initialRequest = useInitialRequest(showInfoBox);

  useEffect(() => {
    if (reFetch) {
      initialRequest();
    }
  }, [initialRequest, reFetch]);
};
