import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { parseUndefinedToEmptyString, regex, validationMsg } from "utils";
import { useFieldValidation } from "hooks";
import { FlowControlButtons, AddressInput } from "components/molecules";
import { TextInput } from "components/atoms";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";

const validationSchema = yup.object().shape({
  phone_number: yup.string().matches(regex.phone, validationMsg.phoneNumber),
});

const Form1 = ({ finalizeStep, goStepBack }) => {
  const fieldValidation = useFieldValidation(validationSchema);

  const onSubmit = (data) => {
    const correctedAddress = {
      address_line_1: data.line_1,
      address_line_2: data.line_2,
      city: data.town_city,
    };

    delete data.line_1;
    delete data.line_2;
    delete data.town_city;

    finalizeStep({
      data: {
        ...data,
        ...correctedAddress,
      },
    });
  };

  const introducer_details =
    useSelector((state) => state.application.introducer_details) || {};
  const broker_company_name = useSelector(
    (state) => state.application.broker_company_name
  );
  const broker_name = useSelector((state) => state.application.broker_name);

  const introducerDetails = {
    ...introducer_details,
    line_1: introducer_details.address_line_1,
    line_2: introducer_details.address_line_2,
    town_city: introducer_details.city,
  };

  const initialValues = {
    ...introducerDetails,
    firm: broker_company_name,
    introducer: broker_name,
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, form, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Field
              component={TextInput}
              name="firm"
              label="Firm"
              type="text"
              disabled={true}
            />
            <Field
              component={TextInput}
              name="introducer"
              label="Introducer"
              type="text"
              disabled={true}
            />

            <AddressInput
              form={form}
              shouldShowManualEdit={!!values.country}
              canSkipAddressValidation={true}
            />

            <Field
              component={TextInput}
              name="phone_number"
              label="Phone number"
              type="text"
              validate={(value) => fieldValidation("phone_number", value)}
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
