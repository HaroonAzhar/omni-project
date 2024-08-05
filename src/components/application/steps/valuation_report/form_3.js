import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

import {
  TextInput,
  Button,
  PriceField,
  SelectInput,
  RadioInput,
  Fieldset,
  NavigationButtonContainer,
  TextAreaInput,
} from "components/atoms";
import { formValidation } from "utils";

import { StyledToolContainer } from "./toolbox_atoms";

const validationSchema = yup.object().shape({
  number_of_units: yup.number().integer().min(1),
});

const securitySubtypeOptions = [
  {
    value: "detached_house",
    label: "Detached House",
  },
  {
    value: "terrace",
    label: "Terrace",
  },
  {
    value: "converted_flat",
    label: "Converted Flat",
  },
  {
    value: "purpose_built_flat",
    label: "Purpose Built Flat",
  },
  {
    value: "shops",
    label: "Shops",
  },
  {
    value: "general_industrial",
    label: "General Industrial",
  },
  {
    value: "business_offices_light_industrial",
    label: "Business Offices & Light Industrial",
  },
  {
    value: "hotel",
    label: "Hotel",
  },
  {
    value: "residential_institutions",
    label: "Residential Institutions",
  },
];

const getInitialValueWhenSecondCharge = (propertyData) => {
  if (propertyData && propertyData.opfl_charge_type === "second_charge") {
    return propertyData.charge.current_mortgage_outstanding;
  }
};

const Form3 = ({ finalizeStep, goStepBack }) => {
  const validate = async (values) => formValidation(validationSchema, values);
  const { indexOfElement = 0 } = useParams();

  const properties = useSelector((state) => state.application.properties);
  const propertyData = properties && properties[indexOfElement];
  const flowInputValues = propertyData && propertyData.valuation_report;

  const onSubmit = (data) => {
    const dataToSend = { ...data };
    if (data.single_multi_unit === "single") {
      dataToSend.number_of_units = "1";
    }
    delete dataToSend.security_tenure;
    delete dataToSend.single_multi_unit;

    return finalizeStep({ data: dataToSend });
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        first_charge_outstanding: getInitialValueWhenSecondCharge(propertyData),
        security_tenure: propertyData && propertyData.details.property_type,
        ...flowInputValues,
        single_multi_unit:
          flowInputValues && flowInputValues.number_of_units === "1"
            ? "single"
            : "multiple",
      }}
      render={({ handleSubmit, submitting, touched, errors, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledToolContainer>
            <Field
              component={TextAreaInput}
              type="text"
              name="security_description"
              label="Security description"
            />

            <Field
              component={SelectInput}
              type="select"
              name="security_tenure"
              label="Security Tenure"
              disabled
              options={[
                {
                  value: "",
                  label: " ",
                },
                {
                  value: "freehold",
                  label: "Freehold",
                },
                {
                  value: "leasehold",
                  label: "Leasehold",
                },
                {
                  value: "heritable_ownership",
                  label: "Heritable/Ownership",
                },
              ]}
            />

            <Field
              component={SelectInput}
              type="select"
              name="security_subtype"
              label="Security Subtype"
              options={securitySubtypeOptions}
            />

            <PriceField
              name="first_charge_outstanding"
              label="First Charge Outstanding"
            />

            <Fieldset
              title="Single/Multi unit"
              touched={touched.single_multi_unit}
              error={errors.single_multi_unit}
              shouldUseRadioContainer={false}
            >
              <Field
                component={RadioInput}
                type="radio"
                name="single_multi_unit"
                value="single"
                label="Single"
              />
              <Field
                component={RadioInput}
                type="radio"
                name="single_multi_unit"
                value="multiple"
                label="Multiple"
              />
            </Fieldset>

            {values.single_multi_unit === "multiple" && (
              <Field
                component={TextInput}
                type="number"
                name="number_of_units"
                label="Number of units"
              />
            )}

            <NavigationButtonContainer>
              <Button kind="fade" type="button" onClick={goStepBack}>
                Back
              </Button>

              <Button type="submit" disabled={submitting}>
                Next
              </Button>
            </NavigationButtonContainer>
          </StyledToolContainer>
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
