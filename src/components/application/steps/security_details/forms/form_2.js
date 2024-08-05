import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import { TextAreaInput, PriceField } from "components/atoms";
import { FlowControlButtons, Question } from "components/molecules";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";

const shouldPurposeOfBorrowingsBeDisabled = (values) => {
  return (
    values.details &&
    values.details.purchase_price >= values.details.current_value
  );
};

const Form2 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement: indexOfProperty = 0 } = useParams();
  const properties = useSelector((state) => state.application.properties) || {};
  const property = (properties && properties[indexOfProperty]) || {};

  const onSubmit = getOnSubmit(property, finalizeStep);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={property}
      render={({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Question
              label="Already owned"
              name="details.already_owned"
              disabled={true}
            />

            <Question
              label="Being purchased"
              name="details.being_purchased"
              disabled={true}
            />

            <PriceField
              name="details.current_value"
              label="Estimated current value"
              placeholder="£££"
              disabled={true}
            />
            <PriceField
              name="details.value_after_works"
              label="Estimated value after work"
              placeholder="£££"
              disabled={true}
            />
            <PriceField
              name="details.purchase_price"
              label="Purchase price"
              placeholder="£££"
              disabled={true}
            />
            <Field
              component={TextAreaInput}
              type="text"
              name="details.purpose_of_borrowings"
              label="If purchase undervalue please provide an explanation (required)"
              disabled={shouldPurposeOfBorrowingsBeDisabled(values)}
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
