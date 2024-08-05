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
  ContactType: yup.string().required(validationMsg.applicantTypeRequired),
});

const TypeOfApplicantForm = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data, stepId: "contact_type" });

  const validate = async (values) => formValidation(validationSchema, values);
  const ContactType = useSelector(({ dip }) => dip.ContactType);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{ ContactType }}
      render={({ handleSubmit, submitting, touched, errors }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Fieldset
              title="Choose type of applicant"
              touched={touched.ContactType}
              errors={errors.ContactType}
            >
              <Field
                component={RadioInput}
                type="radio"
                name="ContactType"
                value="company"
                label="Company"
              />

              <Field
                component={RadioInput}
                type="radio"
                name="ContactType"
                value="individual"
                label="Individual"
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

export default TypeOfApplicantForm;

TypeOfApplicantForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
