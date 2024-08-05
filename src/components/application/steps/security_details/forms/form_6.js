import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import { TextAreaInput, TextInput, Button } from "components/atoms";
import { Question } from "components/molecules";
import {
  StyledMainFormContent,
  StyledButtonsContainer,
} from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";
import prepareContactData from "../contact_details/helpers/prepare_contact_data";
import ContactDetails from "../contact_details";

const Form6 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement: indexOfProperty = 0 } = useParams();
  const properties = useSelector((state) => state.application.properties);
  const property = (properties && properties[indexOfProperty]) || {};

  let initialValue = property;
  if (property.details) {
    initialValue = {
      ...property,
      details: {
        selected_contact_for_access_valuation: "manual",
        selected_contact_for_payment_valuation: "manual",
        payment_contact_details_same_as_access_valuation: false,
        ...prepareContactData.getInitialDetails(property.details),
      },
    };
  }

  const onSubmit = (data) => {
    const saveData = { ...data };
    if (data.details) {
      saveData.details = prepareContactData.toSend(saveData.details);
    }

    getOnSubmit(property, finalizeStep)(saveData);
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValue}
      render={({ form, handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Question
              label="Is the property currently occupied"
              name="details.is_occupied"
            />
            {values.details && values.details.is_occupied && (
              <>
                <Field
                  component={TextInput}
                  type="text"
                  name="details.basis_for_occupation"
                  label="What are the basis for occupation"
                />
                <Question
                  label="Is the property currently occupied by the borrower and/or a member of his/her family"
                  name="details.is_occupied_by_borrower"
                />
              </>
            )}
            <Field
              component={TextAreaInput}
              type="text"
              name="details.intentions"
              label="What are your intentions with the property"
            />
            <ContactDetails
              form={form}
              title="Contact details for access for valuation"
              contactFor="access"
            />

            <Question
              label="Are payment contact details the same as access to valuation?"
              name="details.payment_contact_details_same_as_access_valuation"
            />

            {values.details &&
              !values.details
                .payment_contact_details_same_as_access_valuation && (
                <ContactDetails
                  form={form}
                  title="Contact details for payment of valuation fee"
                  contactFor="payment"
                />
              )}
          </StyledMainFormContent>

          <StyledButtonsContainer>
            <Button kind="fade" type="button" onClick={goStepBack}>
              Back
            </Button>

            <Button type="submit" disabled={submitting}>
              Save
            </Button>
          </StyledButtonsContainer>
        </form>
      )}
    />
  );
};

export default Form6;

Form6.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
