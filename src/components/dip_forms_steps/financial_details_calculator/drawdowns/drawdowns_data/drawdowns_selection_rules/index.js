import generateDrawdownsInAuto from "../generate_drawdowns_in_auto";
import getDrawdownsInManual from "../get_drawdowns_in_manual";
import combineDrawdownsWithCalculatorDrawdowns from "../combine_drawdowns_with_calculator_drawdowns";
import areDrawdownsValid from "./are_drawdowns_valid";

export const getDrawdownsData = ({
  getMode = () => {},
  generateDrawdownsInAuto: generateAuto = generateDrawdownsInAuto,
  getDrawdownsInManual: getManual = getDrawdownsInManual,
  combineDrawdownsWithCalculatorDrawdowns: combineWithCalculator = combineDrawdownsWithCalculatorDrawdowns,
  getCalculatorDrawdowns,
  ...rest
}) => {
  const getCalculatorDrawdownsLength = () =>
    (getCalculatorDrawdowns() || []).length;
  let drawdowns = [];
  if (getMode() === "auto") {
    drawdowns = generateAuto({ ...rest, getCalculatorDrawdownsLength });
  } else {
    drawdowns = getManual({ ...rest, getCalculatorDrawdownsLength });
  }

  return combineWithCalculator({
    drawdowns,
    getCalculatorDrawdowns,
  });
};

const drawdownsData = ({ getLoanAdvanceType, getStartDate, ...rest }) => {
  if (!areDrawdownsValid({ getLoanAdvanceType })) {
    return undefined;
  }

  if (!getStartDate()) {
    return [];
  }

  return getDrawdownsData({ ...rest, getStartDate });
};

export default drawdownsData;
