import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { Button, Fieldset, RadioInput } from "components/atoms";
import { formValidation, validationMsg } from "utils";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "./styled_dip_steps";

const validationSchema = yup.object().shape({
  BuildingType: yup.string().required(validationMsg.required),
});

const LoanPropertyTypeForm = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data, stepId: "building_type" });
  const validate = async (values) => formValidation(validationSchema, values);

  const BuildingType = useSelector(({ dip }) => dip.BuildingType);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{ BuildingType }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Fieldset title="Type of property for which the loan is taken">
              <Field
                component={RadioInput}
                type="radio"
                name="BuildingType"
                value="development"
                label="Development"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="BuildingType"
                value="non_development"
                label="Non development"
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

export default LoanPropertyTypeForm;

LoanPropertyTypeForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
