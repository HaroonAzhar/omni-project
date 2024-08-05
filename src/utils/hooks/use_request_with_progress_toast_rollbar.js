import { useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import Axios from "axios";

import { useProgress } from "components/progress";
import { rollbar } from "utils";

const useRequestWithProgressToastRollbar = (
  requestFunction,
  message = "Request"
) => {
  const [, setLoading] = useProgress(false);
  const { addToast } = useToasts();

  return useCallback(
    (...theArgs) => {
      setLoading(true);

      return requestFunction(...theArgs)
        .then((response) => {
          addToast(`${message} successful`, { appearance: "success" });
          setLoading(false);
          return response ?? true;
        })
        .catch((err) => {
          if (Axios.isCancel(err)) {
            return false;
          }
          const failMessage = `${message} failed`;
          setLoading(false);
          addToast(failMessage, { appearance: "error" });
          rollbar.error(failMessage, err);
        });
    },
    [addToast, message, requestFunction, setLoading]
  );
};

export default useRequestWithProgressToastRollbar;
