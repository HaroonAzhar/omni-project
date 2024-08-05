export const DELEGATED = Symbol("Property from a specific type_of_loan");

export const mergeSummaryData = (base = {}, caseData = {}) => {
  const isKeyExistInCaseData = (key) => Object.keys(caseData).indexOf(key) >= 0;

  const reduceCallback = (acc, key) => {
    const baseValue = base[key];

    if (baseValue !== DELEGATED) return { ...acc, [key]: baseValue };

    if (isKeyExistInCaseData(key)) {
      return { ...acc, [key]: caseData[key] };
    }

    return acc;
  };

  return Object.keys(base).reduce(reduceCallback, {});
};

export const getSummedValueFromSecurities = (securities = [], valueName) =>
  securities.reduce((acc, security) => acc + security[valueName], 0);

export const formatMonthsText = (numberOfMonths) => {
  if (!numberOfMonths) return "";
  return `${numberOfMonths} ${
    numberOfMonths.length === 1 ? "month" : "months"
  }`;
};
