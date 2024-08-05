import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { formValidation, validationMsg } from "utils";
import {
  Button,
  TextInput,
  H2,
  PriceField,
  PercentField,
} from "components/atoms";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "../styled_dip_steps";

const requireWhenMultipleAdvance = (field) =>
  field.when("$AdvanceType", (AdvanceType, schema) =>
    AdvanceType === "multiple"
      ? schema.required(validationMsg.required)
      : schema
  );

const validationSchema = yup.object().shape({
  MaxLtvDayOne: yup.number().required(validationMsg.required),
  FurtherDrawDowns: requireWhenMultipleAdvance(yup.number()),
  LtvToGdv: requireWhenMultipleAdvance(yup.number()),
  BuildPeriodMonths: requireWhenMultipleAdvance(yup.number()),
});

const FinancialDetailsForm = ({ finalizeStep, goStepBack }) => {
  const {
    MaxLtvDayOne,
    LtvToGdv,
    AdvanceType,
    BuildingType,
    FurtherDrawDowns,
    BuildPeriodMonths,
    PurchasePrice,
    LoanPurpose,
  } = useSelector((state) => state.dip);
  const onSubmit = (data) => {
    finalizeStep({ data, stepId: "financial_details" });
  };
  const validate = async (values) =>
    formValidation(validationSchema, values, {
      AdvanceType,
      BuildingType,
    });

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        MaxLtvDayOne,
        LtvToGdv,
        FurtherDrawDowns,
        BuildPeriodMonths,
        PurchasePrice,
      }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            {AdvanceType === "multiple" && (
              <PriceField
                name="FurtherDrawDowns"
                label="Further draw downs"
                placeholder="£££"
              />
            )}
            <PercentField
              name="MaxLtvDayOne"
              label="Max LTV day one (%)"
              placeholder="%"
            />
            {AdvanceType === "multiple" && (
              <>
                <PercentField
                  name="LtvToGdv"
                  label="Max LTGDV"
                  placeholder="%"
                />
                <br />
                <H2>Property details</H2>

                <Field
                  component={TextInput}
                  type="text"
                  name="BuildPeriodMonths"
                  label="Build Period"
                  placeholder="Please fill the number of months"
                />
              </>
            )}

            {LoanPurpose === "purchase" && (
              <PriceField
                name="PurchasePrice"
                label="Purchase Price"
                placeholder="£££"
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
  );
};

export default FinancialDetailsForm;

FinancialDetailsForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
