import getCalculatorInput from "./get_calculator_input";
import { useFurtherAdvances } from "./drawdowns/use_further_advances";

export default (dip) => {
  const { getDrawdownsForCalculatorRequest } = useFurtherAdvances();

  return (values) => {
    const drawdowns = getDrawdownsForCalculatorRequest(values);

    return getCalculatorInput({
      values,
      drawdowns,
      dip,
    });
  };
};
