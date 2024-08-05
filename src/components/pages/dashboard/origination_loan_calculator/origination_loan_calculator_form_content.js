import React from "react";
import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import {
  Button,
  Fieldset,
  IntegerField,
  PercentField,
  PriceField,
  RadioInput,
  ReadonlyEntry,
} from "components/atoms";
import { formValidation } from "utils";

import originationLoanFormValidationSchema from "./origination_loan_form_validation_schema";

const OriginationLoanCalculatorFormContent = ({ onSubmit }) => {
  const validation = async (values) =>
    formValidation(originationLoanFormValidationSchema, values);
  return (
    <Form
      onSubmit={onSubmit}
      validate={validation}
      initialValues={{
        interestRate: 1.0,
        arrangementFeePercent: 2.0,
        otherFees: 650,
      }}
      render={({ handleSubmit, values, submitting, touched, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={10}>
              <Grid item m>
                <PriceField name="propertyValue" label="Property Value" />
                <PercentField name="maximumLtv" label="Maximum LTV" />
                <IntegerField name="loanPeriod" label="Loan Period" />
                <PercentField name="interestRate" label="Interest Rate" />
                <PercentField
                  name="arrangementFeePercent"
                  label="Arrangement Fee %"
                />
                <PriceField name="otherFees" label="Other Fees" />
              </Grid>
              <Grid item m>
                <Fieldset
                  title="Drawdown Type"
                  touched={touched.drawdownType}
                  error={errors.drawdownType}
                >
                  <Field
                    component={RadioInput}
                    type="radio"
                    name="drawdownType"
                    value="single"
                    label="Single"
                  />
                  <Field
                    component={RadioInput}
                    type="radio"
                    name="drawdownType"
                    value="multiple"
                    label="Multiple"
                  />
                </Fieldset>
                {values.drawdownType === "single" && (
                  <Fieldset
                    title="Interest Method"
                    touched={touched.interestMethod}
                    error={errors.interestMethod}
                  >
                    <Field
                      component={RadioInput}
                      type="radio"
                      name="interestMethod"
                      value="retained"
                      label="Retained"
                    />
                    <Field
                      component={RadioInput}
                      type="radio"
                      name="interestMethod"
                      value="serviced"
                      label="Serviced"
                    />
                    <Field
                      component={RadioInput}
                      type="radio"
                      name="interestMethod"
                      value="rolled_up"
                      label="Rolled Up"
                    />
                  </Fieldset>
                )}

                {values.drawdownType === "multiple" && (
                  <>
                    <ReadonlyEntry label="Type of loan" text="Rolled Up" />
                    <IntegerField
                      name="numberOfFurtherDrawdowns"
                      label="Number of Further Drawdowns"
                    />
                    <PriceField
                      name="totalFurtherDrawdownsAmount"
                      label="Total Further Drawdowns Amount"
                    />
                  </>
                )}
              </Grid>
            </Grid>
            <br />
            <Button disabled={submitting}>Calculate</Button>
          </form>
        );
      }}
    />
  );
};

export default OriginationLoanCalculatorFormContent;

OriginationLoanCalculatorFormContent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
