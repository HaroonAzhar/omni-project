const getAutomaticDrawdownsAdvances = ({
  getExpectedTotalOfAdvances = () => 0,
  getBuildPeriod = () => 0,
}) => {
  const buildPeriod = getBuildPeriod() || 0;
  if (buildPeriod < 1) {
    return [];
  }
  const expectedTotalOfDrawdowns = getExpectedTotalOfAdvances();
  const singleFurtherAdvance = +(
    expectedTotalOfDrawdowns / buildPeriod
  ).toFixed(2);
  const splittedFurtherAdvancesValues = new Array(+buildPeriod).fill(
    singleFurtherAdvance
  );
  splittedFurtherAdvancesValues[0] -=
    singleFurtherAdvance * buildPeriod - expectedTotalOfDrawdowns;
  splittedFurtherAdvancesValues[0] = +splittedFurtherAdvancesValues[0].toFixed(
    2
  );
  return splittedFurtherAdvancesValues;
};

export default getAutomaticDrawdownsAdvances;
