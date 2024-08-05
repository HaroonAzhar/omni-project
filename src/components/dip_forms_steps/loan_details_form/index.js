/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { formValidation, validationMsg } from "utils";
import {
  Button,
  TextInput,
  RadioInput,
  Fieldset,
  ReadonlyEntry,
} from "components/atoms";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "../styled_dip_steps";
import { StyledLabel } from "./styled_loan_details_form";

const validationSchema = yup.object().shape({
  LoanTerm: yup
    .number()
    .required(validationMsg.required)
    .max(24, "Max Loan Term is 24 months."),
  LoanType: yup.string().required(validationMsg.required),
  LoanPurpose: yup.string().required(validationMsg.required),
});

const labelText =
  " Multiple Advance loans are required to use Rolled Up interest";

const LoanDetailsForm = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data, stepId: "loan_details" });
  const validate = async (values) => formValidation(validationSchema, values);

  const LoanTerm = useSelector((state) => state.dip?.LoanTerm);
  const LoanType = useSelector((state) => state.dip?.LoanType);
  const LoanPurpose = useSelector((state) => state.dip?.LoanPurpose);
  const AdvanceType = useSelector((state) => state.dip?.AdvanceType);

  const initialValues = {
    LoanTerm,
    LoanPurpose,
    LoanType: AdvanceType === "multiple" ? "rolled_up" : LoanType,
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, touched, errors, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Fieldset>
              <Field
                component={TextInput}
                type="text"
                name="LoanTerm"
                label="Loan Term"
                placeholder="Months"
              />
            </Fieldset>

            {AdvanceType === "single" && (
              <Fieldset
                title="Type of loan"
                touched={touched.LoanType}
                error={errors.LoanType}
              >
                <Field
                  component={RadioInput}
                  type="radio"
                  name="LoanType"
                  value="retained"
                  label="Retained"
                />
                <Field
                  component={RadioInput}
                  type="radio"
                  name="LoanType"
                  value="serviced"
                  label="Serviced"
                />
                <Field
                  component={RadioInput}
                  type="radio"
                  name="LoanType"
                  value="rolled_up"
                  label="Rolled Up"
                />
              </Fieldset>
            )}

            {AdvanceType === "multiple" && (
              <ReadonlyEntry label="Type of loan" text="Rolled Up">
                {" "}
                <StyledLabel
                  text={labelText}
                  color="warn"
                  className="RolledUpLabel"
                />
              </ReadonlyEntry>
            )}

            <Fieldset
              title="Loan purpose"
              touched={touched.LoanPurpose}
              errors={errors.LoanPurpose}
            >
              <Field
                component={RadioInput}
                type="radio"
                name="LoanPurpose"
                value="purchase"
                label="Purchase"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="LoanPurpose"
                value="refinance"
                label="Refinance"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="LoanPurpose"
                value="capital_raising"
                label="Capital raising"
              />
            </Fieldset>
          </StyledMainFormContent>

          <StyledButtonsContainer>
            <Button kind="fade" type="button" onClick={goStepBack}>
              Back
            </Button>

            <Button type="submit" disabled={submitting}>
              Continue
            </Button>
          </StyledButtonsContainer>
        </form>
      )}
    />
  );
};

export default LoanDetailsForm;

LoanDetailsForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
