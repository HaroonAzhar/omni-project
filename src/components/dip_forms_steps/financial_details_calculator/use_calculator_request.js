import { useState } from "react";
import axios from "axios";

import { calculator } from "utils/requests";
const { CancelToken } = axios;

export default () => {
  const [
    lastCalculatorRequestCancelling,
    setLastCalculatorRequestCancelling,
  ] = useState();

  return (newCalculatorInput) => {
    if (lastCalculatorRequestCancelling) {
      lastCalculatorRequestCancelling.cancel("cancelled by axios");
    }

    const requestCanceling = CancelToken.source();
    setLastCalculatorRequestCancelling(requestCanceling);

    return calculator(newCalculatorInput, {
      cancelToken: requestCanceling.token,
    });
  };
};
