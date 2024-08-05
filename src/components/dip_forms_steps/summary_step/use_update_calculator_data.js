import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useRequestWithProgressToastRollbar } from "utils";
import { saveDipFinancialCalculatorDetails } from "utils/requests/api";

import useInitialValues from "../financial_details_calculator/use_initial_values";
import useSendCalculatorRequest from "../financial_details_calculator/use_send_calculator_request";
import getCalculatorStepSavingRequestPayload from "../financial_details_calculator/get_calculator_step_saving_request_payload";

export default () => {
  const sendCalculatorRequest = useSendCalculatorRequest({
    setIsResultsCalculated: () => {},
    showInfoBox: () => {},
  });
  const { DipId } = useSelector(({ dip }) => dip);
  const initialValues = useInitialValues();
  const { id } = useParams();
  const { calculatorResponse } = useSelector((state) => state.calculator);

  const request = useRequestWithProgressToastRollbar(
    saveDipFinancialCalculatorDetails
  );

  useEffect(() => {
    if (!DipId) return;

    sendCalculatorRequest().then(
      request(
        getCalculatorStepSavingRequestPayload(
          initialValues,
          calculatorResponse
        ),
        id
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, DipId]);
};
