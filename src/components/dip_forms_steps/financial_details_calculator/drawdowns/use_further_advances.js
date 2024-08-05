import { useSelector } from "react-redux";

import drawdownsData, { areDrawdownsValid } from "./drawdowns_data";

const getDip = (state) => state.dip;
const getCalculatorState = (state) => state.calculator;

export const useFurtherAdvances = () => {
  const dip = useSelector(getDip);
  const { calculatorResponse } = useSelector(getCalculatorState);

  const getDrawdownsFromFormValues = (formValues) => {
    const getFromRedux = (property) => {
      const { [property]: requestedProperty } = dip;
      return requestedProperty;
    };

    const getFromForm = (property) => {
      const { [property]: requestedProperty } = formValues;
      return requestedProperty;
    };

    const getLoanAdvanceType = () => getFromRedux("AdvanceType");
    const getBuildPeriod = () => getFromRedux("BuildPeriodMonths");
    const getExpectedTotalOfAdvances = () => getFromRedux("FurtherDrawDowns");

    const getStartDate = () => getFromForm("StartDate");
    const getExistingManualAdvances = () => getFromForm("furtherAdvances");
    const getFirstAdvance = () => getFromForm("InitialNetLoanAmount");

    const getMode = () => (getFromForm("IsManualMode") ? "manual" : "auto");

    const getCalculatorDrawdowns = () =>
      calculatorResponse && calculatorResponse.drawdowns;

    const drawdowns = drawdownsData({
      getLoanAdvanceType,
      getStartDate,
      getBuildPeriod,
      getExpectedTotalOfAdvances,
      getMode,
      getExistingManualAdvances,
      getCalculatorDrawdowns,
      getFirstAdvance,
    });

    const shouldShowDrawdowns = areDrawdownsValid({ getLoanAdvanceType });

    return {
      shouldShowDrawdowns,
      drawdowns,
      totalOfFurtherAdvances: getExpectedTotalOfAdvances(),
    };
  };

  const getDrawdownsForCalculatorRequest = (formValues) => {
    const { drawdowns } = getDrawdownsFromFormValues(formValues);
    return (
      drawdowns &&
      drawdowns
        .filter((drawdown) => drawdown.isShown)
        .map((drawdown) => ({
          date: drawdown.date,
          advance: Number(drawdown.advance),
        }))
    );
  };

  return { getDrawdownsFromFormValues, getDrawdownsForCalculatorRequest };
};
