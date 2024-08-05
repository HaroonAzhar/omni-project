import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import * as yup from "yup";

import {
  formValidation,
  parseUndefinedToEmptyString,
  // validationMsg,
} from "utils";
import { Button, TextInput } from "components/atoms";
import { errorColor } from "styles/colors";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import { getCompany } from "../../../../helpers/company_data_selector";

const validationSchema = yup.object().shape({});

const StyledFindCompanyWrapper = styled.div`
  position: relative;
`;

const StyledErrorLabel = styled.p`
  color: ${errorColor};
`;

const Form1 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) =>
    finalizeStep({
      data: { ...data, type_of_applicant: "company" },
      step_id: "company_details_form",
    });
  const { email, type_of_introducer, applicants } = useSelector(
    (state) => state.application
  );

  const { base_data } = useSelector(getCompany);

  const validate = async (values) =>
    formValidation(validationSchema, values, { type_of_introducer });

  const initialValues = {
    base_data: {
      name: applicants?.[0]?.name,
      ...(base_data || {}),
      email: email || (applicants && applicants[0] && applicants[0].email),
    },
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, form, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <StyledFindCompanyWrapper>
                <Field
                  component={TextInput}
                  type="text"
                  name="base_data.name"
                  label="Company name"
                  placeholder="Enter Company Name"
                  disabled={true}
                />

                <StyledErrorLabel>
                  {touched["base_data.company_number"] && errors.company_number}
                </StyledErrorLabel>
              </StyledFindCompanyWrapper>

              <Field
                type="text"
                render={() => null}
                name="base_data.company_number"
              />

              {type_of_introducer !== "via_broker" && (
                <Field
                  component={TextInput}
                  type="text"
                  name="base_data.email"
                  label="Email"
                  placeholder="name@domain.domain"
                  disabled={true}
                />
              )}

              <Field
                component={TextInput}
                type="text"
                name="base_data.name" // Temporary.
                label="Applicant/Trading name"
                parse={parseUndefinedToEmptyString}
              />

              <Field
                component={TextInput}
                type="number"
                name="base_data.number_of_partners"
                label="Total number of partners/directors/shareholders"
                parse={parseUndefinedToEmptyString}
              />
            </StyledMainFormContent>

            <StyledButtonsContainer>
              <Button kind="fade" type="button" onClick={goStepBack}>
                Back
              </Button>

              <Button type="submit" disabled={submitting}>
                Continue
              </Button>
            </StyledButtonsContainer>
          </form>
        )}
      />
    </>
  );
};

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
