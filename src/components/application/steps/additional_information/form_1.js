import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { FlowControlButtons } from "components/molecules";
import { TextAreaInput, TextInput } from "components/atoms";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";
import { getExpectedCompletionDateOfOverview } from "components/case_summary/selectors";
import { parseUndefinedToEmptyString } from "utils";

const StyledTextArea = styled(TextAreaInput)`
  & textarea {
    min-height: 250px;
  }
`;

const Form1 = ({ finalizeStep }) => {
  const onSubmit = (data) => finalizeStep({ data });

  const additional_information = useSelector(
    (state) => state.application.additional_information
  );

  const expected_completion_date = useSelector(
    getExpectedCompletionDateOfOverview
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ ...additional_information, expected_completion_date }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Field
              component={StyledTextArea}
              name="additional_information"
              label="Additional Information"
              parse={parseUndefinedToEmptyString}
            />
            <Field
              component={TextInput}
              name="expected_completion_date"
              label="Expected Completion Date"
              type="date"
            />
          </StyledMainFormContent>

          <FlowControlButtons isContinueDisabled={submitting} />
        </form>
      )}
    />
  );
};

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
};
