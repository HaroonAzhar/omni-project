import { classify } from "inflected";

const classifyObject = (toUnderscore) => {
  if (typeof toUnderscore !== "object") {
    return toUnderscore;
  }
  return Object.entries(toUnderscore).reduce((acc, [key, value]) => {
    const newKey = classify(key);
    let newValue = value;

    if (Array.isArray(value)) {
      newValue = value.map((element) => classifyObject(element));
    } else if (typeof value === "object" && value !== null) {
      newValue = classifyObject(value);
    }
    return { ...acc, [newKey]: newValue };
  }, toUnderscore);
};

export default (values, calculatorResponse) => {
  const CalculatorResponse = classifyObject(calculatorResponse);

  const calculatorData = {
    ...CalculatorResponse,
    ArrangementFee: CalculatorResponse?.ArrangementFeeInValue,
    GrossTotalLoanAmount: CalculatorResponse?.GrossLoan,
    drawdowns: CalculatorResponse?.drawdowns?.map((drawdown, index) => {
      const Drawdown = CalculatorResponse.Drawdown[index];
      return {
        ...drawdown,
        ...Drawdown,
      };
    }),
  };

  return {
    ...values,
    ...calculatorData,
  };
};
