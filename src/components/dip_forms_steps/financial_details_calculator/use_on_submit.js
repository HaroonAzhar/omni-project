import { useCallback } from "react";
import { useSelector } from "react-redux";

import getCalculatorStepSavingRequestPayload from "./get_calculator_step_saving_request_payload";

export default ({ finalizeStep }) => {
  const { calculatorResponse } = useSelector((state) => state.calculator);

  return useCallback(
    (values) => {
      finalizeStep({
        data: getCalculatorStepSavingRequestPayload(values, calculatorResponse),
        stepId: "financial_calculator_details",
      });
    },
    [calculatorResponse, finalizeStep]
  );
};
