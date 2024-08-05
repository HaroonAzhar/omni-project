import getDrawdownsDates from "../get_drawdowns_dates";
import getAdvance from "../get_advance";

const getDrawdowns = ({
  getFirstAdvance = () => {},
  getBuildPeriod = () => {},
  getStartDate,
  getCalculatorDrawdownsLength,
  getExpectedTotalOfAdvances,
  getDrawdownsDates: getDates = getDrawdownsDates,
  getAdvances = () => [],
  isEditable = () => {},
}) => {
  const dates = getDates({
    getBuildPeriod,
    getStartDate,
    getCalculatorDrawdownsLength,
  });

  const drawdownAdvances = getAdvances({
    getBuildPeriod,
    getExpectedTotalOfAdvances,
  });

  const drawdowns = dates.map((date, index) => ({
    date,
    advance: getAdvance({ index, getFirstAdvance, drawdownAdvances }),
    isShown: index <= getBuildPeriod(),
    isEditable: isEditable(index),
  }));

  return drawdowns;
};

export default getDrawdowns;
