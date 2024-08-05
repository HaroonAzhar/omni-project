import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { formValidation, validationMsg } from "utils";
import { Button, Fieldset, RadioInput } from "components/atoms";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "./styled_dip_steps";

const validationSchema = yup.object().shape({
  AdvanceType: yup.string().required(validationMsg.applicationTypeRequired),
});

const TypeOfLoanForm = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data, stepId: "advance_type" });

  const validate = async (values) => formValidation(validationSchema, values);
  const AdvanceType = useSelector(({ dip }) => dip.AdvanceType);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        AdvanceType,
      }}
      render={({ handleSubmit, submitting, touched, errors }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Fieldset
              title="Loan Advance Type"
              touched={touched.AdvanceType}
              errors={errors.AdvanceType}
            >
              <Field
                component={RadioInput}
                type="radio"
                name="AdvanceType"
                value="single"
                label="Single"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="AdvanceType"
                value="multiple"
                label="Multiple"
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

export default TypeOfLoanForm;

TypeOfLoanForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
