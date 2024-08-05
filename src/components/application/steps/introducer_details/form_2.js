import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import { TextInput } from "components/atoms";
import { FlowControlButtons, Question } from "components/molecules";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";
import { parseUndefinedToEmptyString } from "utils";

const Form1 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data });

  const { introducer_details = {}, broker_email } = useSelector(
    (state) => state.application
  );

  const initialValues = {
    ...introducer_details,
    email: broker_email,
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Field
              component={TextInput}
              type="text"
              name="email"
              label="Email"
              disabled={true}
            />

            <Field
              component={TextInput}
              type="text"
              name="interim_permission_number"
              label="FCA / Interim Permission Number"
              parse={parseUndefinedToEmptyString}
            />

            <Question
              label="Has the introducer/packager had a face to face interview with the borrower?"
              name="have_met_client"
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

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};

export default Form1;
