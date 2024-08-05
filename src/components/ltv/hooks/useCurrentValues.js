import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

import LtvRequestService from "module/ltv/requestService";
import { useProgress } from "components/progress";

const useCurrentValues = () => {
  const [currentValues, setCurrentValues] = useState(null);
  const [, setLoading] = useProgress();
  const { addToast } = useToasts();

  useEffect(() => {
    const asyncEffect = async () => {
      setLoading(true);

      try {
        const response = await LtvRequestService.getCurrent();

        setCurrentValues(response.data || null);
      } catch (err) {
        addToast("We cannot fetch current values", { appearance: "error" });
      }

      setLoading(false);
    };

    asyncEffect();
  }, [addToast, setCurrentValues, setLoading]);

  return currentValues;
};

export default useCurrentValues;
