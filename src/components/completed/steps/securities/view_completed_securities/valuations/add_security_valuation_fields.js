import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import {
  PriceField,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "components/atoms";

import { otherOption, valuationOptions } from "./valuation_options";

function AddSecurityValuationFields({ values }) {
  return (
    <>
      <PriceField label="Valuation" name="Valuation" />
      <PriceField label="GDV" name="GDV" />
      <Field component={TextInput} label="Valuer" name="Valuer" />
      <Field
        component={TextInput}
        label="Valuation Date"
        name="ValuationDate"
        type="date"
      />
      <Field
        component={TextInput}
        label="Report Date"
        name="ReportDate"
        type="date"
      />
      <Field
        component={TextInput}
        label="Recipient Name"
        name="RecipientName"
      />

      <Field
        component={SelectInput}
        label="Valuation Type"
        name="ValuationType"
        options={valuationOptions}
      />
      {values.ValuationType === otherOption && (
        <Field
          component={TextInput}
          label="Specify Other Type"
          name="ValuationTypeOther"
        />
      )}

      <Field component={TextAreaInput} label="Notes" name="Notes" />
    </>
  );
}

AddSecurityValuationFields.propTypes = {
  values: PropTypes.object.isRequired,
};

export default AddSecurityValuationFields;
