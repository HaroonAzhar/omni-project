import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import { TextInput, Button, Fieldset, RadioInput } from "components/atoms";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";

const Form2 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement = 0 } = useParams();
  const individuals = useSelector((state) => state.application.individuals);
  const applicant = (individuals && individuals[indexOfElement]) || {};

  const onSubmit = getOnSubmit(applicant, finalizeStep);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={applicant}
      render={({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Fieldset title="Marital Status">
              <Field
                component={RadioInput}
                type="radio"
                name="personal_data.marital_status"
                value="single"
                label="Single"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="personal_data.marital_status"
                value="married"
                label="Married"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="personal_data.marital_status"
                value="civil_partnership"
                label="Civil Partnership"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="personal_data.marital_status"
                value="divorced"
                label="Divorced"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="personal_data.marital_status"
                value="widowed"
                label="Widowed"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="personal_data.marital_status"
                value="other"
                label="Other"
              />

              {values.personal_data.marital_status === "other" && (
                <Field
                  component={TextInput}
                  type="text"
                  name="personal_data.marital_other_value"
                  label="Other marital status"
                  placeholder="Here is my special marital status"
                />
              )}
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

export default Form2;

Form2.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
