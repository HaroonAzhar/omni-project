import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { formValidation, validationMsg } from "utils";
import { Button, TextInput, H2 } from "components/atoms";
import { CompaniesHouseSearch } from "components/organisms";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "../styled_dip_steps";

const requireNonBroker = (field) =>
  field.when("$IntroducerType", (IntroducerType, schema) =>
    IntroducerType !== "via_broker"
      ? schema.required(validationMsg.required)
      : schema.nullable()
  );

const validationSchema = yup.object().shape({
  CompanyName: yup.string().required(validationMsg.required),
  CompanyNumber: yup
    .string()
    .when("notInCh", (notInCh, schema) =>
      notInCh
        ? schema.nullable()
        : schema.required(validationMsg.companyMustBeSelected)
    ),
  CompanyEmail: requireNonBroker(yup.string().email()),
});

const notInChCompanyNumber = "N/A";

const CompanyDetailsForm = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => {
    const { notInCh, ...rest } = data;
    if (notInCh) {
      rest.CompanyNumber = notInChCompanyNumber;
    }
    finalizeStep({
      data: { ...rest, ContactType: "company" },
      stepId: "contact_company",
    });
  };

  const {
    CompanyName,
    CompanyNumber,
    CompanyEmail,
    ContactType,
    IntroducerType,
  } = useSelector(({ dip }) => dip);
  const validate = async (values) =>
    formValidation(validationSchema, values, { IntroducerType });

  const getInitialValues = () => {
    if (ContactType === "individual") return {};

    return {
      CompanyName,
      CompanyEmail,
      CompanyNumber,
      notInCh: CompanyNumber === notInChCompanyNumber,
    };
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={getInitialValues()}
        render={({
          handleSubmit,
          submitting,
          form,
          errors,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <H2>Company details</H2>

              <CompaniesHouseSearch
                form={form}
                errors={errors}
                touched={touched}
                values={values}
              />
              {IntroducerType !== "via_broker" && (
                <Field
                  component={TextInput}
                  type="text"
                  name="CompanyEmail"
                  label="Email"
                  placeholder="name@domain.domain"
                />
              )}
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

export default CompanyDetailsForm;

CompanyDetailsForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
