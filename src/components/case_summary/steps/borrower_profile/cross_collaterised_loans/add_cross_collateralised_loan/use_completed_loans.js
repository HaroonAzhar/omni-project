import { useEffect, useState } from "react";

import { useRequestWithProgressToastRollbar } from "utils";
import { getCases } from "utils/requests";

const useCompletedLoans = () => {
  const [completedLoans, setCompletedLoans] = useState([]);

  const request = useRequestWithProgressToastRollbar(getCases);

  useEffect(() => {
    request().then((res) => {
      const cases = res.data;
      const completed = cases.filter(
        (loan) => loan.Stage === "completed" && loan.CaseNr !== undefined
      );
      setCompletedLoans(completed);
    });
  }, [request]);
  return completedLoans;
};

export default useCompletedLoans;
