import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import moment from "moment";

import { Button, PriceField, SelectInput, TextInput } from "components/atoms";
import { formValidation, propertyAddressFormat } from "utils";
import { mapPropertyAddress } from "components/completed/utils";

import { ButtonsContainer } from "../shared_styles/styled_filter";
import validationSchema from "./estimated_redemption_validation_schema";
import { FormWrapper } from "./styled_estimated_redemptions";
import useCompletedSecuritiesData from "../securities/view_completed_securities/use_completed_securities_data";

const isDateBeforeToday = (date) => {
  return moment(date).isBefore(moment(), "day");
};

const isRemainderLastAfterUpdate = (Date, estimatedRedemption, existing) => {
  const modifiedExisting = existing.map((redemption) => {
    if (
      redemption.EstimatedRedemptionId ===
      estimatedRedemption.EstimatedRedemptionId
    ) {
      return { ...redemption, Date };
    }
    return redemption;
  });
  const existingNonRemainder = modifiedExisting.slice(0, -1);
  const remainder = modifiedExisting[modifiedExisting.length - 1] ?? {};
  return existingNonRemainder.every((redemption) =>
    moment(redemption.Date).isSameOrBefore(moment(remainder.Date), "day")
  );
};

const isNewSameOrBeforeRemainder = (Date, existing) => {
  const remainder = existing[existing.length - 1] ?? {};
  return moment(Date).isSameOrBefore(moment(remainder.Date), "day");
};

const isRemainderLast = (Date, estimatedRedemption, existing) => {
  if (estimatedRedemption.EstimatedRedemptionId !== undefined) {
    return isRemainderLastAfterUpdate(Date, estimatedRedemption, existing);
  }

  return isNewSameOrBeforeRemainder(Date, existing);
};

const dateValidation = (existing) => (value, estimatedRedemption, meta) => {
  if (meta.pristine) {
    return null;
  }
  if (isDateBeforeToday(value)) {
    return "Date can not be in the past";
  }
  if (!isRemainderLast(value, estimatedRedemption, existing)) {
    return "Remainder must be last";
  }
  return null;
};
function EstimatedRedemptionForm({
  saveRequest,
  initialValues,
  close,
  existing,
}) {
  const validate = async (values) => formValidation(validationSchema, values);

  const { securities } = useCompletedSecuritiesData(true);

  const initial = {
    ...initialValues,
    Date: moment(initialValues?.Date).format(moment.HTML5_FMT.DATE),
  };
  const securitiesAsOptions = securities.map((security) => ({
    label: propertyAddressFormat({
      address: mapPropertyAddress(security.property),
    }),
    value: security.SecurityId,
  }));
  const options = [{ value: "", label: "Choose one" }, ...securitiesAsOptions];

  return (
    <FormWrapper>
      <Form
        onSubmit={saveRequest}
        initialValues={initial}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <PriceField label="Amount" name="Amount" />
              <Field
                component={TextInput}
                label="Date"
                name="Date"
                type="date"
                validate={dateValidation(existing)}
              />
              <Field
                component={SelectInput}
                label="Security"
                name="FkSecurityId"
                type="text"
                options={options}
              />
              <ButtonsContainer>
                <Button kind="secondary" onClick={close}>
                  Cancel
                </Button>
                <Button>Save</Button>
              </ButtonsContainer>
            </form>
          );
        }}
      />
    </FormWrapper>
  );
}

EstimatedRedemptionForm.propTypes = {
  saveRequest: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  close: PropTypes.func.isRequired,
  existing: PropTypes.array.isRequired,
};

export default EstimatedRedemptionForm;
