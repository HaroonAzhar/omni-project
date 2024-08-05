import { useEffect } from "react";

import useInitialRequest from "./use_initial_request";

export default (showInfoBox) => {
  const initialRequest = useInitialRequest(showInfoBox);

  useEffect(() => {
    initialRequest();
  }, [initialRequest]);
};
