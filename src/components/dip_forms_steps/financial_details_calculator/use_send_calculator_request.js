import { useDispatch, useSelector } from "react-redux";

import { rollbar } from "utils";
import { saveCalculatorData } from "store/calculator/actions";

import useGetCalculatorInput from "./use_get_calculator_input";
import useCalculatorRequest from "./use_calculator_request";

export default ({ setIsResultsCalculated, showInfoBox }) => {
  const dispatch = useDispatch();
  const dip = useSelector((store) => store.dip);
  const getCalculatorInput = useGetCalculatorInput(dip);
  const calculatorRequest = useCalculatorRequest();

  return (values = dip) => {
    setIsResultsCalculated(false);
    const newCalculatorInput = getCalculatorInput(values);

    const setCalculatorData = (calculatorInput, calculatorResponse) => {
      dispatch(
        saveCalculatorData({
          calculatorInput,
          calculatorResponse,
        })
      );
    };

    if (values.StartingPoint !== "market_value") {
      if (values.StartingPoint === "initial_net_loan_amount")
        newCalculatorInput.first_advance = +values.InitialNetLoanAmount;
      else
        newCalculatorInput.gross_amount_at_maturity = +values.GrossAmountAtMaturity;
    }

    return calculatorRequest(newCalculatorInput)
      .then((res) => {
        setCalculatorData(newCalculatorInput, res);
        setIsResultsCalculated(true);
      })
      .catch((err) => {
        showInfoBox("Calculator request failed!");
        rollbar.error("Calculator failed!", err);
      });
  };
};
