import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { Button, TextInput } from "components/atoms";
import { AddressInput, Question } from "components/molecules";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";
import {
  formValidation,
  parseUndefinedToEmptyString,
  validationMsg,
} from "utils";

import { getCompany } from "../../../../helpers/company_data_selector";

const Form3 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => {
    if (data.address) {
      const { registered, correspondence } = data.address;

      data.address.registered = {
        address_line_1: registered.line_1,
        address_line_2: registered.line_2,
        postcode: registered.postcode,
        city: registered.town_city,
        country: registered.country,
      };

      data.address.correspondence = {
        address_line_1: correspondence.line_1,
        address_line_2: correspondence.line_2,
        postcode: correspondence.postcode,
        city: correspondence.town_city,
        country: correspondence.country,
      };
    }

    finalizeStep({
      data: { ...data, type_of_applicant: "company" },
      step_id: "company_details_form",
    });
  };

  const {
    address = { registered: {}, correspondence: {} },
    base_data = {},
  } = useSelector(getCompany);

  const { registered = {}, correspondence = {} } = address;

  const initialValues = {
    address: {
      registered: {
        line_1: registered.address_line_1,
        line_2: registered.address_line_2,
        postcode: registered.postcode,
        town_city: registered.city,
        country: registered.country,
      },
      correspondence: {
        line_1: correspondence.address_line_1,
        line_2: correspondence.address_line_2,
        postcode: correspondence.postcode,
        town_city: correspondence.city,
        country: correspondence.country,
      },
      is_correspondence_same: address.is_correspondence_same,
    },
    base_data,
  };

  const schema = yup.object().shape({
    address: yup.object().shape({
      registered: yup.object().shape({
        postcode: yup.string().required(validationMsg.required),
        country: yup.string().required(validationMsg.required),
      }),
    }),
  });
  const validate = async (values) => formValidation(schema, values);
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, submitting, values, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <AddressInput
              name="address.registered"
              form={form}
              shouldShowManualEdit={true}
              canSkipAddressValidation={true}
            />

            <Question
              label="Is the correspondence address is the same as registered?"
              name="address.is_correspondence_same"
            />

            {values.address.is_correspondence_same === false && (
              <AddressInput
                name="address.correspondence"
                form={form}
                shouldShowManualEdit={true}
                canSkipAddressValidation={true}
              />
            )}

            <Field
              component={TextInput}
              type="text"
              name="base_data.company_number"
              label="Company registration number" // Is it the same number as company_number?
              disabled
            />

            <Field
              component={TextInput}
              type="date"
              name="base_data.date_of_creation"
              label="Date of Creation"
              disabled
            />

            <Field
              component={TextInput}
              type="date"
              name="base_data.date_of_incorporation"
              label="Date of Incorporation"
            />

            <Field
              component={TextInput}
              type="text"
              name="base_data.nature_of_business"
              label="Nature of business"
              parse={parseUndefinedToEmptyString}
            />

            <Field
              component={TextInput}
              type="text"
              name="base_data.trading_since"
              label="Trading since"
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
  );
};

export default Form3;

Form3.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
