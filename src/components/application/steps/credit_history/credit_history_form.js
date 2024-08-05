import React from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { Button } from "components/atoms";
import { Question } from "components/molecules";
import { formValidation, validationMsg } from "utils";
import { useRouteFlowNavigation } from "hooks";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import { StyledTextAreaInput } from "./styled_credit_history_form";

const validationSchema = yup.object().shape({
  credit_history: yup.object().shape({
    refused_mortgage_details: yup.string().max(1000, validationMsg.maxLength),
    debt_judgement_details: yup.string().max(1000, validationMsg.maxLength),

    declared_bankrupt_details: yup.string().max(1000, validationMsg.maxLength),

    failed_to_keep_details: yup.string().max(1000, validationMsg.maxLength),

    claim_dss_details: yup.string().max(1000, validationMsg.maxLength),

    convicted_fraud_details: yup.string().max(1000, validationMsg.maxLength),

    details: yup.string().max(1000, validationMsg.maxLength),
  }),
});

const CreditHistoryForm = ({ finalizeStep }) => {
  const { indexOfElement = 0 } = useParams();
  const { individuals, type_of_applicant: typeOfApplicant } = useSelector(
    (state) => state.application
  );
  const applicant = (individuals && individuals[indexOfElement]) || {
    credit_history: {},
  };
  const history = useHistory();

  const { getPathToFlow } = useRouteFlowNavigation();
  const goToApplicantEdit = () => {
    history.push(getPathToFlow("applicant_details"));
  };

  if (applicant.notReady) {
    return (
      <>
        Credit History cannot be added for an imported applicant. Please enter
        the{" "}
        <Button kind="extra" type="button" onClick={goToApplicantEdit}>
          Applicant Details
        </Button>
      </>
    );
  }

  const onSubmit = (data) => {
    const newApplicant = { ...applicant, credit_history: data.credit_history };
    finalizeStep({ data: newApplicant });
  };
  const credit_history = {
    ...applicant.credit_history,
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ ...applicant, credit_history }}
      validate={(values) => formValidation(validationSchema, values)}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Question
              label="Have you ever been refused a mortgage on this or any other property?"
              name="credit_history.refused_mortgage"
              showDetailsWhenValueIs={true}
            />

            <Question
              label={
                typeOfApplicant === "company"
                  ? "Have any of the directors/shareholders ever had a judgement for debt recorded against them?"
                  : "Have you ever had a judgement for debt recorded against you or if a director your company"
              }
              name="credit_history.debt_judgement"
              showDetailsWhenValueIs={true}
            />

            <Question
              label="Have you ever been declared bankrupt or compounded with your creditors?"
              name="credit_history.declared_bankrupt"
              showDetailsWhenValueIs={true}
            />

            <Question
              label="Have you ever failed to keep up with payments under any present or previous mortgage, rental or loan agreement?"
              name="credit_history.failed_to_keep"
              showDetailsWhenValueIs={true}
            />

            <Question
              label="Have you made a claim to the DSS in the last 12 months?"
              name="credit_history.claim_dss"
              showDetailsWhenValueIs={true}
            />

            <Question
              label="Have you ever been convicted of a fraud offence?"
              name="credit_history.convicted_fraud"
              showDetailsWhenValueIs={true}
            />

            <Field
              component={StyledTextAreaInput}
              name="credit_history.details"
              label="Other Details"
            />
          </StyledMainFormContent>

          <StyledButtonsContainer>
            <Button type="submit" disabled={submitting}>
              Confirm
            </Button>
          </StyledButtonsContainer>
        </form>
      )}
    />
  );
};

export default CreditHistoryForm;

CreditHistoryForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
};
