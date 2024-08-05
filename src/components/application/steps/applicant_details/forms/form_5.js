import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { underscore, parameterize } from "inflected";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import { TextInput, RadioInput, Button, Fieldset } from "components/atoms";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";

const validationSchema = yup.object().shape({
  contact: yup.object().shape({
    email: yup.string().email(),
  }),
});

const fieldValidation = (value, meta) => {
  try {
    yup.reach(validationSchema, meta.name).validateSync(value);
  } catch (validation_error) {
    return validation_error.errors && validation_error.errors[0];
  }
};

const contactMethods = ["Home phone", "Mobile phone", "Work phone", "Email"];
const contactMethodsParameters = contactMethods.map((label) => ({
  label,
  contactValue: underscore(parameterize(label, { separator: "_" })),
  isEmail: !label.includes("phone"),
}));
const contactMethodFields = contactMethodsParameters.map(
  ({ label, contactValue, isEmail }) => (
    <Field
      component={TextInput}
      type="text"
      name={`contact.${contactValue}`}
      label={label}
      placeholder={isEmail ? "anna.mar.js@gmail.com" : "992 34 50 88"}
      validate={
        isEmail ? (value, _, meta) => fieldValidation(value, meta) : () => {}
      }
      key={`contact_${contactValue}`}
    />
  )
);

const contactMethodOptions = contactMethodsParameters.map(
  ({ label, contactValue }) => (
    <Field
      component={RadioInput}
      type="radio"
      name="contact.contact_method"
      value={contactValue}
      label={label}
      key={`contact_method_${label}`}
    />
  )
);

const Form5 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement = 0 } = useParams();
  const individuals = useSelector((state) => state.application.individuals);
  const applicant = (individuals && individuals[indexOfElement]) || {};

  const onSubmit = getOnSubmit(applicant, finalizeStep);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={applicant}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            {contactMethodFields}

            <Fieldset title="Preferred contact method">
              {contactMethodOptions}
              <Field
                component={RadioInput}
                type="radio"
                name="contact.contact_method"
                value="either"
                label="Either"
              />
            </Fieldset>

            <Field
              component={TextInput}
              type="number"
              name="contact.number_of_dependants"
              label="Number of dependants"
            />
          </StyledMainFormContent>

          <StyledButtonsContainer>
            <Button kind="fade" type="button" onClick={goStepBack}>
              Back
            </Button>

            <Button type="submit" disabled={submitting}>
              Save
            </Button>
          </StyledButtonsContainer>
        </form>
      )}
    />
  );
};

export default Form5;

Form5.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
