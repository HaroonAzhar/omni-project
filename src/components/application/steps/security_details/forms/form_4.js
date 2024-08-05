import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import { humanize } from "inflected";
import * as yup from "yup";

import { Fieldset, RadioInput, TextInput } from "components/atoms";
import { FlowControlButtons } from "components/molecules";
import { formValidation } from "utils";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";

const securityTypeOptions = [
  "residential",
  "commercial",
  "land",
  `semi_commercial`,
  "development",
  `office_block`,
  `airspace_development`,
  "other",
];

const validationSchema = yup.object().shape({
  details: yup.object().shape({
    years_remaining_on_lease: yup.number().integer(),
  }),
});

const securityTypeFields = securityTypeOptions.map((securityTypeValue) => (
  <Field
    component={RadioInput}
    type="radio"
    name="details.security_type"
    value={securityTypeValue}
    label={humanize(securityTypeValue)}
    disabled={true}
  />
));

const Form4 = ({ finalizeStep, goStepBack }) => {
  const validate = async (values) => formValidation(validationSchema, values);
  const { indexOfElement: indexOfProperty } = useParams();
  const properties = useSelector((state) => state.application.properties);
  const property = (properties && properties[indexOfProperty]) || {};

  const onSubmit = getOnSubmit(property, finalizeStep);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={property}
      validate={validate}
      render={({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Fieldset title="Property type">
              <Field
                component={RadioInput}
                type="radio"
                name="details.property_type"
                value="freehold"
                label="Freehold"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="details.property_type"
                value="leasehold"
                label="Leasehold"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="details.property_type"
                value="heritable_ownership"
                label="Heritable/Ownership"
              />
            </Fieldset>

            {values.details && values.details.property_type === "leasehold" && (
              <Field
                component={TextInput}
                type="number"
                name="details.years_remaining_on_lease"
                label="Years remaining on lease"
              />
            )}
            <Fieldset title="Security type" disabled={true}>
              {securityTypeFields}
              {values.details && values.details.security_type === "other" && (
                <Field
                  component={TextInput}
                  type="text"
                  name="details.security_type_other"
                  label="Other type"
                />
              )}
            </Fieldset>
          </StyledMainFormContent>

          <FlowControlButtons
            onBack={goStepBack}
            isContinueDisabled={submitting}
          />
        </form>
      )}
    />
  );
};

export default Form4;

Form4.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
