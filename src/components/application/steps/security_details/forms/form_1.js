import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { FlowControlButtons, AddressInput } from "components/molecules";
import { formValidation, regex, validationMsg } from "utils";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";

const validationSchema = yup.object().shape({
  address: yup.object().shape({
    postcode: yup
      .string()
      .matches(regex.postcode, { message: validationMsg.postcode }),
  }),
});

const Form1 = ({ finalizeStep, goStepBack }) => {
  const validate = async (values) => formValidation(validationSchema, values);
  const { indexOfElement: indexOfProperty = 0 } = useParams();
  const properties = useSelector((state) => state.application.properties);
  const property = (properties && properties[indexOfProperty]) || {};

  const onSubmit = (data) => {
    if (data.address) {
      const { town_city } = data.address;

      delete data.address.town_city;

      data.address = {
        ...data.address,
        city: town_city,
      };
    }

    getOnSubmit(property, finalizeStep)(data);
  };

  if (property && property.address) {
    property.address = {
      ...property.address,
      town_city: property.address.city,
    };
  }
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={property}
      validate={validate}
      render={({ handleSubmit, submitting, form, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <AddressInput
              name="address"
              form={form}
              shouldShowManualEdit={!!(values && values.address)}
              canSkipAddressValidation={true}
              disabled={true}
              isViewOnly={true}
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
