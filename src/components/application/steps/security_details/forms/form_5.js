import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";

import { FlowControlButtons, Question } from "components/molecules";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";

const Form5 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement: indexOfProperty = 0 } = useParams();
  const properties = useSelector((state) => state.application.properties);
  const property = (properties && properties[indexOfProperty]) || {};

  const onSubmit = getOnSubmit(property, finalizeStep);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={property}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Question
              label="Is property of standard construction?"
              name="details.is_standard_construction"
            />
            <Question
              label="Is property a new build?"
              name="details.is_new_build"
            />
            <Question
              label="Is planning permission required?"
              name="details.is_planning_required"
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

export default Form5;

Form5.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
