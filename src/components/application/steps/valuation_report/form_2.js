import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import { OnChange } from "react-final-form-listeners";

import {
  TextInput,
  Button,
  PriceField,
  NavigationButtonContainer,
} from "components/atoms";

import { multipleByFeetFactor, divideByFeetFactor } from "./utils";
import { StyledToolContainer, StyledDateContainer } from "./toolbox_atoms";

const Form2 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data });
  const { indexOfElement = 0 } = useParams();

  const properties = useSelector((state) => state.application.properties);
  const propertyData = properties && properties[indexOfElement];
  const flowInputValues = propertyData && propertyData.valuation_report;

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        market_value: propertyData && propertyData.details.current_value,
        gdv: propertyData && propertyData.details.value_after_works,
        ...flowInputValues,
      }}
      render={({ handleSubmit, submitting, active, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledToolContainer>
            <StyledDateContainer>
              <PriceField name="market_value" label="Market Value" />

              <PriceField name="day_value" label="90 Day Value" />
            </StyledDateContainer>

            <StyledDateContainer>
              <PriceField name="gdv" label="GDV" />

              <PriceField name="day_gdv" label="90 Day GDV" />
            </StyledDateContainer>

            <PriceField
              name="reinstatement_value"
              label="Reinstatement Value"
            />

            <PriceField name="market_rent" label="Market Rent" />

            <Field
              component={TextInput}
              type="text"
              name="title_no"
              label="Title No"
            />

            <StyledDateContainer>
              <PriceField
                name="price_per_square_foot"
                label="Price per square foot"
              />
              <OnChange name="price_per_square_foot">
                {(value) => {
                  if (active !== "price_per_square_foot") return;
                  form.change(
                    "price_per_square_meters",
                    multipleByFeetFactor(value)
                  );
                }}
              </OnChange>

              <PriceField
                name="price_per_square_meters"
                label="Price per square meters"
              />
              <OnChange name="price_per_square_meters">
                {(value) => {
                  if (active !== "price_per_square_meters") return;
                  form.change(
                    "price_per_square_foot",
                    divideByFeetFactor(value)
                  );
                }}
              </OnChange>
            </StyledDateContainer>

            <StyledDateContainer>
              <Field
                component={TextInput}
                type="number"
                name="total_square_feet"
                label="Total square feet"
              />
              <OnChange name="total_square_feet">
                {(value) => {
                  if (active !== "total_square_feet") return;
                  form.change("total_square_meters", divideByFeetFactor(value));
                }}
              </OnChange>

              <Field
                component={TextInput}
                type="number"
                name="total_square_meters"
                label="Total square meters"
              />
              <OnChange name="total_square_meters">
                {(value) => {
                  if (active !== "total_square_meters") return;
                  form.change("total_square_feet", multipleByFeetFactor(value));
                }}
              </OnChange>
            </StyledDateContainer>

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

export default Form2;

Form2.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
