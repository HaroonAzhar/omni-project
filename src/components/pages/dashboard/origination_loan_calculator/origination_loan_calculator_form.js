import React, { useState } from "react";

import { H2 } from "components/atoms";
import { calculator } from "utils/requests";
import { rollbar } from "utils";

import CalculatingSpinner from "./calculating_spinner";
import CalculatingResult from "./calculating_results";
import OriginationLoanCalculatorFormContent from "./origination_loan_calculator_form_content";

const OriginationLoanCalculatorForm = () => {
  const [isResultsCalculated, setIsResultsCalculated] = useState(true);

  const [calculatorResponse, setCalculatorResponse] = useState(undefined);
  const [isError, setError] = useState(false);
  const onSubmit = (formValues) => {
    const requestInput = {
      total_valuations: +formValues.propertyValue,
      max_gross_ltv: +formValues.maximumLtv / 100,
      initial_term: +formValues.loanPeriod,
      type:
        formValues.drawdownType === "single"
          ? formValues.interestMethod
          : "rolled_up",
      build_period:
        formValues.drawdownType === "multiple"
          ? +formValues.numberOfFurtherDrawdowns
          : 0,
      further_advances:
        formValues.drawdownType === "multiple"
          ? +formValues.totalFurtherDrawdownsAmount
          : 0,
      monthly_interest_rate: +formValues.interestRate / 100.0,
      completion_administration_fee: +formValues.otherFees,
      arrangement_fee_percent: +formValues.arrangementFeePercent,
    };
    setIsResultsCalculated(false);
    calculator(requestInput)
      .then((result) => {
        setCalculatorResponse(result);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        rollbar.error(error);
      })
      .finally(() => setIsResultsCalculated(true));
  };

  return (
    <>
      <H2>Pop-up Calculator</H2>
      <OriginationLoanCalculatorFormContent onSubmit={onSubmit} />
      {!isResultsCalculated && <CalculatingSpinner />}
      <CalculatingResult
        calculatorResponse={calculatorResponse}
        error={isError}
      />
    </>
  );
};

export default OriginationLoanCalculatorForm;
