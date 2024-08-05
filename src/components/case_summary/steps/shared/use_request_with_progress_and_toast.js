import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { useProgress } from "components/progress";

const useRequestWithProgressAndToast = (savingFunction) => {
  const [, setLoading] = useProgress(false);
  const { addToast } = useToasts();
  const { id } = useParams();

  return useCallback(
    async (...theArgs) => {
      setLoading(true);

      let result = {};
      try {
        result = await savingFunction(id, ...theArgs);
        addToast("Saved successfully", { appearance: "success" });
      } catch (err) {
        addToast("Saving failed", { appearance: "error" });
      }

      setLoading(false);
      return result;
    },
    [setLoading, addToast, id, savingFunction]
  );
};

export default useRequestWithProgressAndToast;
