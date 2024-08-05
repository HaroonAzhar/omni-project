import { useState } from "react";
import { debounce, isNaN } from "lodash";

import useCalculatorRequest from "components/dip_forms_steps/financial_details_calculator/use_calculator_request";
import { useRequestWithProgressToastRollbar } from "utils";

import calculatorRequestInput from "./calculator_request_input";

const useEnquiryCalculatorRequest = () => {
  const [response, setResponse] = useState({});

  const calculatorRequest = useCalculatorRequest();
  const calculatorRequestWithLogging = useRequestWithProgressToastRollbar(
    calculatorRequest,
    "Calculator Request"
  );
  const trySendCalculatorRequest = (values) => {
    const input = calculatorRequestInput(values);
    if (input.type === undefined) {
      return;
    }
    if (isNaN(input.first_advance)) {
      delete input.first_advance;
    }
    calculatorRequestWithLogging(input).then((res) => {
      setResponse(res);
    });
  };
  const sendRequest = debounce(trySendCalculatorRequest, 1000);
  return { sendRequest, response };
};

export default useEnquiryCalculatorRequest;
