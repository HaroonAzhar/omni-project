import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

import validationMsg from "utils/validation_messages";
import formValidation from "utils/form_validation";
import phoneNumberValidator from "utils/validation/phoneNumberValidator";
import {
  FlowControlButtons,
  AddressInput,
  Question,
} from "components/molecules";
import { H1, TextInput } from "components/atoms";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";
import { parseUndefinedToEmptyString } from "utils";

import AreThereLabel from "./are_there_label";
import { QuestionsColumnsWrapper, Column } from "./styled_solicitors_details";

// prepare validation schema
const validationSchema = yup.object().shape({
  are_least_two_partners: yup.boolean().oneOf([true], "Can't proceed"),
  email: yup.string().when("are_least_two_partners", {
    is: true,
    then: yup.string().email(validationMsg.email),
  }),
  phone_number: yup.string().when("are_least_two_partners", {
    is: true,
    then: phoneNumberValidator,
  }),
});

const Form1 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => {
    const {
      line_1,
      line_2,
      town_city,
      // eslint-disable-next-line no-unused-vars
      security_address: _,
      ...restData
    } = data;

    const dataToSave = {
      ...restData,
      address_line_1: line_1,
      address_line_2: line_2,
      city: town_city,
    };

    finalizeStep({
      data: dataToSave,
    });
  };

  const solicitor_details =
    useSelector((state) => state.application.solicitor_details) || {};

  const initialValues = useMemo(
    () => ({
      ...solicitor_details,
      line_1: solicitor_details.address_line_1,
      line_2: solicitor_details.address_line_2,
      town_city: solicitor_details.city,
    }),
    [solicitor_details]
  );

  const isAddressPresent = [
    initialValues?.line_1,
    initialValues?.line_2,
    initialValues?.town_city,
    initialValues?.postcode,
    initialValues?.country,
  ].some((element) => element !== undefined);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={async (values) => formValidation(validationSchema, values)}
      render={({ handleSubmit, submitting, form, values }) => {
        const shouldBlockFormFields = !values.are_least_two_partners;

        return (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <H1>Borrower&apos;s Solicitor</H1>
              <QuestionsColumnsWrapper>
                <Column>
                  <Question
                    label={AreThereLabel}
                    name="are_least_two_partners"
                  />

                  <Field
                    component={TextInput}
                    type="text"
                    name="company_name"
                    label="Solicitor firm name"
                    disabled={shouldBlockFormFields}
                    parse={parseUndefinedToEmptyString}
                  />
                  <Field
                    component={TextInput}
                    type="text"
                    name="phone_number"
                    label="Telephone number"
                    disabled={shouldBlockFormFields}
                    parse={parseUndefinedToEmptyString}
                  />
                  <Field
                    component={TextInput}
                    type="text"
                    name="email"
                    label="Email address"
                    disabled={shouldBlockFormFields}
                    parse={parseUndefinedToEmptyString}
                  />
                </Column>
                <Column>
                  <AddressInput
                    form={form}
                    shouldShowManualEdit={isAddressPresent}
                    canSkipAddressValidation={true}
                    disabled={shouldBlockFormFields}
                  />
                </Column>
              </QuestionsColumnsWrapper>
            </StyledMainFormContent>

            <FlowControlButtons
              onBack={goStepBack}
              isContinueDisabled={submitting || shouldBlockFormFields}
            />
          </form>
        );
      }}
    />
  );
};

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
