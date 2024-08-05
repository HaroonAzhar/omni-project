import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import { titleize } from "inflected";
import { createSelector } from "reselect";
import * as yup from "yup";

import { FlowControlButtons } from "components/molecules";
import { H1, TextInput } from "components/atoms";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";
import {
  formValidation,
  parseUndefinedToEmptyString,
  validationMsg,
} from "utils";

import Solicitor from "./solicitor";

const getApplication = (state) => state.application;

const getSolicitorDetails = createSelector(
  [getApplication],
  (application) => application.solicitor_details || {}
);

const getLoanPurpose = createSelector(
  [getApplication],
  (application) => application.loan_purpose
);

const getBuildingType = createSelector(
  [getApplication],
  (application) => application.building_type
);

const Form2 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => {
    finalizeStep({
      data,
    });
  };

  const solicitor_details = useSelector(getSolicitorDetails);

  const loan_purpose = useSelector(getLoanPurpose);

  const building_type = useSelector(getBuildingType);

  const transaction_type = `${titleize(loan_purpose)} ${titleize(
    building_type
  )}`;

  const initialValues = { ...solicitor_details, transaction_type };
  const solicitor = solicitor_details.omni_solicitor_id;

  const schema = yup.object().shape({
    omni_solicitor_id: yup.number().required(validationMsg.required),
  });
  const validate = async (values) => formValidation(schema, values);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, submitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <H1>OMNI Solicitor</H1>

              <Solicitor solicitor={solicitor} />

              <Field
                component={TextInput}
                type="text"
                name="omni_solicitor_phone_number"
                label="Telephone number"
                parse={parseUndefinedToEmptyString}
              />
              <Field
                component={TextInput}
                type="text"
                name="omni_solicitor_email"
                label="Email address"
                parse={parseUndefinedToEmptyString}
              />

              <Field
                component={TextInput}
                type="text"
                name="transaction_type"
                label="Transaction type"
                disabled={true}
              />
            </StyledMainFormContent>

            <FlowControlButtons
              onBack={goStepBack}
              isContinueDisabled={submitting}
            />
          </form>
        );
      }}
    />
  );
};

export default Form2;

Form2.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
