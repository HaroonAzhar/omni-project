import getDrawdowns from "../get_drawdowns";

const generateDrawdownsInAuto = ({
  getExistingManualAdvances: getAdvances,
  ...rest
}) => {
  return getDrawdowns({
    ...rest,
    getAdvances,
    isEditable: (index) => index !== 0,
  });
};

export default generateDrawdownsInAuto;
