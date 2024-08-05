import moment from "moment";

const getDrawdownsDates = ({
  getBuildPeriod = () => 1,
  getStartDate = () => new Date(),
  getCalculatorDrawdownsLength = () => undefined,
}) => {
  const length = +(getCalculatorDrawdownsLength() || getBuildPeriod() + 1);

  const drawdownsDates = Array.from({ length }).map((_, index) =>
    moment(getStartDate()).add(index, "M").format("DD/MM/YYYY")
  );
  return drawdownsDates;
};

export default getDrawdownsDates;
