import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import { OnChange } from "react-final-form-listeners";
import debounce from "lodash/debounce";

import { formValidation } from "utils";
import { Button } from "components/atoms";

import validationSchema from "./validation_schema";
import {
  StyledButtonsContainer,
  StyledForm,
  StyledCalculatingMessage,
  StyledSpinnerLoader,
} from "./styled_financial_details_calculator";
import { getSumOfSecurityEstimations } from "./utils";
import CalculatorInputs from "./calculator_inputs";
import Drawdowns from "./drawdowns";
import { useFurtherAdvances } from "./drawdowns/use_further_advances";
import useInitialValues from "./use_initial_values";
import useSendCalculatorRequest from "./use_send_calculator_request";
import useOnSubmit from "./use_on_submit";

const FinancialDetailsCalculator = ({
  finalizeStep,
  goStepBack,
  showInfoBox,
  cacheCalculatorData,
  calculatorCache,
}) => {
  const dip = useSelector((state) => state.dip);

  const {
    PremiumForLendersInsurance,
    CompletionAdministrationFee,
    LoanType,
    securities,
    IntroducerType,
  } = dip;

  const { calculatorResponse: calculator_response } = useSelector(
    (state) => state.calculator
  );

  const sumOfSecurityEstimations = getSumOfSecurityEstimations(securities);

  const onSubmit = useOnSubmit({
    finalizeStep,
    sumOfSecurityEstimations,
    LoanType,
    CompletionAdministrationFee,
    PremiumForLendersInsurance,
  });

  const isObjectEmpty = (obj) => !!Object.keys(obj).length;

  const [isResultsCalculated, setIsResultsCalculated] = useState(
    isObjectEmpty(calculator_response || {})
  );
  const [isInitialRequestSended, setIsInitialRequestSended] = useState(false);

  const validate = async (values) =>
    formValidation(validationSchema, values, { IntroducerType });

  const { getDrawdownsFromFormValues } = useFurtherAdvances();

  const sendCalculatorRequest = useSendCalculatorRequest({
    setIsResultsCalculated,
    showInfoBox,
  });

  const debouncedCalculatorRequest = debounce(sendCalculatorRequest, 1000);

  const runInitialCalcRequest = (values) => {
    /* To run initial calculator request we need to wait for LoanType value   */
    if (isInitialRequestSended || !LoanType) return;

    sendCalculatorRequest(values);
    setIsInitialRequestSended(true);
  };

  const initialValues = useInitialValues(calculatorCache);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ submitting, values, handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          {runInitialCalcRequest(values)}
          <OnChange>{debouncedCalculatorRequest}</OnChange>
          <OnChange>
            {(formValues) => {
              setIsResultsCalculated(false);
              cacheCalculatorData(formValues);
            }}
          </OnChange>

          <CalculatorInputs
            values={values}
            store={{
              PremiumForLendersInsurance,
              CompletionAdministrationFee,
            }}
            shouldShowIntermediaryFee={IntroducerType === "via_broker"}
          />

          <Drawdowns
            formValues={values}
            getDrawdownsFromFormValues={getDrawdownsFromFormValues}
          />

          <StyledButtonsContainer>
            <Button kind="fade" type="button" onClick={goStepBack}>
              Back
            </Button>

            <Button type="submit" disabled={submitting || !isResultsCalculated}>
              Continue
            </Button>

            {!isResultsCalculated && (
              <StyledCalculatingMessage>
                <StyledSpinnerLoader />
                Calculating - Please Wait
              </StyledCalculatingMessage>
            )}
          </StyledButtonsContainer>
        </StyledForm>
      )}
    />
  );
};

FinancialDetailsCalculator.propTypes = {
  finalizeStep: PropTypes.func,
  goStepBack: PropTypes.func,
  showInfoBox: PropTypes.func,
  cacheCalculatorData: PropTypes.func.isRequired,
  calculatorCache: PropTypes.object.isRequired,
};

export default FinancialDetailsCalculator;
