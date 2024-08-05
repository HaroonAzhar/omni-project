import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {
  TextInput,
  Fieldset,
  RadioInput,
  TextAreaInput,
} from "components/atoms";
import { FlowControlButtons } from "components/molecules";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";
import { parseUndefinedToEmptyString } from "utils";

const StyledFieldset = styled(Fieldset)`
  margin-top: 30px;
`;

const Form2 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data });

  const { application_loan_details } = useSelector(
    (state) => state.application
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={application_loan_details}
      render={({ handleSubmit, submitting, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Field
              component={TextInput}
              type="text"
              name="source_of_deposit"
              label="Source of deposit"
              parse={parseUndefinedToEmptyString}
            />

            <StyledFieldset
              title="Repayment method"
              touched={touched.loan_purpose}
              errors={errors.loan_purpose}
            >
              <Field
                component={RadioInput}
                type="radio"
                name="repayment_method"
                value="sale_of_property"
                label="Sale of property"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="repayment_method"
                value="refinance"
                label="Refinance"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="repayment_method"
                value="other"
                label="Other"
              />
              <Field
                component={TextAreaInput}
                type="text"
                name="repayment_method_details"
                label="Further details "
                parse={parseUndefinedToEmptyString}
              />
            </StyledFieldset>

            <Field
              component={TextInput}
              type="text"
              name="proposed_completion_date"
              label="Proposed completion timescale (months)"
              parse={parseUndefinedToEmptyString}
            />
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

export default Form2;

Form2.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
