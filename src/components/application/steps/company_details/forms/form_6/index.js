import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import { Button, TextInput } from "components/atoms";
import { AddressInput } from "components/molecules";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import { getCompany } from "../../../../helpers/company_data_selector";

const Form5 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = ({ accountant }) => {
    const preparedData = {
      accountant: {
        ...accountant,
        address: {
          ...accountant.address,
          address_line_1: accountant.address.line_1,
          address_line_2: accountant.address.line_2,
          city: accountant.address.town_city,
        },
      },
    };

    delete preparedData.accountant.address.line_1;
    delete preparedData.accountant.address.line_2;
    delete preparedData.accountant.address.town_city;
    delete preparedData.accountant.address.security_address;

    finalizeStep({
      data: { ...preparedData, type_of_applicant: "company" },
      step_id: "company_details_form",
    });
  };

  const { accountant = {} } = useSelector(getCompany);

  const accountantAddress = {
    ...accountant.address,
    line_1: accountant.address && accountant.address.address_line_1,
    line_2: accountant.address && accountant.address.address_line_2,
    town_city: accountant.address && accountant.address.city,
  };
  const shouldShowManualEdit = !!(
    accountant.address && accountant.address.country
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        accountant: {
          ...accountant,
          address: accountantAddress,
        },
      }}
      render={({ handleSubmit, submitting, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Field
              component={TextInput}
              type="text"
              name="accountant.name"
              label="Company accountant name"
            />

            <Field
              component={TextInput}
              type="text"
              name="accountant.surname"
              label="Company accountant surname"
            />
            <Field
              component={TextInput}
              type="text"
              name="accountant.firm"
              label="Company accountant firm"
            />

            <AddressInput
              form={form}
              name="accountant.address"
              shouldShowManualEdit={shouldShowManualEdit}
              canSkipAddressValidation={true}
            />

            <Field
              component={TextInput}
              type="text"
              name="accountant.qualification"
              label="Qualification"
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

export default Form5;

Form5.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
