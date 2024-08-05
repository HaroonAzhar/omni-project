import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { statement } from "utils/requests";

import useAdjustmentsData from "../../adjustments/view_adjustments/use_adjustments_data";
import useDefaultEventsPeriods from "../../default_events/view_default_events/use_default_events_periods";
import { getCompleted, getDip } from "../../selectors";
import getStatementInput from "./get_statement_input";

const useCashflowsData = ({
  totalValuations,
  totalGDV,
  endDate,
  additionalAdjustment,
} = {}) => {
  const { adjustments } = useAdjustmentsData(true);
  const sendAdjustments = useMemo(() => {
    if (additionalAdjustment !== undefined) {
      return [...adjustments, additionalAdjustment];
    }
    return adjustments;
  }, [additionalAdjustment, adjustments]);

  const { defaultEventsPeriods } = useDefaultEventsPeriods(true);
  const [statementResults, setStatementResults] = useState([]);

  const dip = useSelector(getDip);
  const completed = useSelector(getCompleted);

  const generateStatementInput = useCallback(
    () =>
      getStatementInput({
        dip,
        adjustments: sendAdjustments,
        completed,
        defaultEventsPeriods,
        endDate,
        totalValuations,
        totalGDV,
      }),
    [
      completed,
      sendAdjustments,
      dip,
      defaultEventsPeriods,
      endDate,
      totalValuations,
      totalGDV,
    ]
  );
  useEffect(() => {
    const input = generateStatementInput();
    statement(input).then((res) => setStatementResults(res));
  }, [generateStatementInput]);

  return { adjustments, statementResults };
};

export default useCashflowsData;
