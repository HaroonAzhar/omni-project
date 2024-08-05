import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextInput } from "components/atoms";

import useContactDetailsValidation from "./use_contact_details_validation";
import { StyledFieldset } from "../forms/styled_form_6";
import ContactDropdown from "./contact_dropdown";

const ContactDetails = ({ form, title, contactFor }) => {
  const [selectedIndividual, setSelectedIndividual] = useState();
  const validate = useContactDetailsValidation({ contactFor });

  const nameElementName = `details.contact_for_${contactFor}_valuation_name`;
  const emailElementName = `details.contact_for_${contactFor}_valuation_email`;
  const phoneElementName = `details.contact_for_${contactFor}_valuation_phone`;

  useEffect(() => {
    form.change(nameElementName, selectedIndividual && selectedIndividual.name);
    form.change(
      emailElementName,
      selectedIndividual && selectedIndividual.email
    );

    form.change(
      phoneElementName,
      selectedIndividual &&
        (selectedIndividual.work_phone || selectedIndividual.phone)
    );
  }, [selectedIndividual]); // eslint-disable-line

  const shouldInputBeDisabled =
    selectedIndividual && !selectedIndividual.isManual;

  return (
    <StyledFieldset title={title}>
      <ContactDropdown
        setSelectedIndividual={setSelectedIndividual}
        contactFor={contactFor}
        form={form}
      />
      <Field
        component={TextInput}
        name={nameElementName}
        label="Name"
        type="text"
        validate={validate("name")}
        disabled={shouldInputBeDisabled}
      />
      <Field
        component={TextInput}
        name={emailElementName}
        label="Email"
        type="text"
        validate={validate("email")}
        disabled={shouldInputBeDisabled}
      />
      <Field
        component={TextInput}
        name={phoneElementName}
        label="Phone/Work Phone"
        type="text"
        validate={validate("phone")}
        disabled={shouldInputBeDisabled}
      />
    </StyledFieldset>
  );
};

ContactDetails.propTypes = {
  form: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  contactFor: PropTypes.string.isRequired,
};

export default ContactDetails;
