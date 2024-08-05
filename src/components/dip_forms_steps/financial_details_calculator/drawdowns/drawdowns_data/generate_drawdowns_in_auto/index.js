import getAutomaticDrawdownsAdvances from "./get_automatic_drawdowns_advances";
import getDrawdowns from "../get_drawdowns";

const generateDrawdownsInAuto = ({
  getAutomaticDrawdownsAdvances: getAdvances = getAutomaticDrawdownsAdvances,
  ...rest
}) => {
  return getDrawdowns({
    ...rest,
    getAdvances,
    isEditable: () => false,
  });
};

export default generateDrawdownsInAuto;
