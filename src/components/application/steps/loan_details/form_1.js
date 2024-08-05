import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import { TextInput, PriceField } from "components/atoms";
import TextAreaInput from "components/atoms/text_input/textarea_input";
import { FlowControlButtons } from "components/molecules";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";
import { parseUndefinedToEmptyString } from "utils";

const Form1 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data });

  const further_draw_downs = useSelector(
    (state) => state.application.further_draw_downs
  );
  const loan_term = useSelector((state) => state.application.loan_term);
  const application_loan_details =
    useSelector((state) => state.application.application_loan_details) || {};

  const { calculatorResponse } = useSelector((state) => state.calculator);

  const initialValues = {
    ...application_loan_details,
    further_draw_downs_borrowing: further_draw_downs,
    initial_net_loan:
      calculatorResponse && calculatorResponse.net_amount_of_first_advance,
    term: loan_term,
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <PriceField
              label="Initial net loan required"
              name="initial_net_loan"
              placeholder="£££"
              disabled={true}
            />
            <PriceField
              label="Further borrowing required for works"
              name="further_draw_downs_borrowing"
              placeholder="£££"
              disabled={true}
            />

            <Field
              component={TextInput}
              type="number"
              name="term"
              label="Term (months)"
              disabled={true}
            />

            <Field
              component={TextAreaInput}
              name="purpose_of_borrowings"
              label="Purpose of borrowings"
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

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
