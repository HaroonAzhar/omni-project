import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

import LtvRequestService from "module/ltv/requestService";
import { useProgress } from "components/progress";

const useColumns = () => {
  const [columns, setColumns] = useState([]);
  const [, setLoading] = useProgress();
  const { addToast } = useToasts();

  useEffect(() => {
    (async function asyncEffect() {
      setLoading(true);

      try {
        const response = await LtvRequestService.getFields();

        setColumns(Object.entries(response.data || null));
      } catch (err) {
        addToast("We cannot fetch columns", { appearance: "error" });
      }

      setLoading(false);
    })();
  }, [addToast, setColumns, setLoading]);

  return columns;
};

export default useColumns;
