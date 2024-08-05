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
  TextAreaInput,
} from "components/atoms";

import { multipleByFeetFactor, divideByFeetFactor } from "./utils";
import { StyledToolContainer, StyledDateContainer } from "./toolbox_atoms";

const Form5 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data });
  const { indexOfElement = 0 } = useParams();

  const properties = useSelector((state) => state.application.properties);
  const propertyData = properties && properties[indexOfElement];
  const flowInputValues = propertyData && propertyData.valuation_report;

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={flowInputValues}
      render={({ handleSubmit, submitting, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledToolContainer>
            <PriceField name="build_costs" label="Total Build Costs" />

            <StyledDateContainer>
              <PriceField
                name="build_costs_per_square_foot"
                label="Build Costs per Square Foot"
              />
              <OnChange name="build_costs_per_square_foot">
                {(value) => {
                  form.change(
                    "build_costs_per_square_meter",
                    multipleByFeetFactor(value)
                  );
                }}
              </OnChange>

              <PriceField
                name="build_costs_per_square_meter"
                label="Build Costs per Square Meter"
              />
              <OnChange name="build_costs_per_square_meter">
                {(value) => {
                  form.change(
                    "build_costs_per_square_foot",
                    divideByFeetFactor(value)
                  );
                }}
              </OnChange>
            </StyledDateContainer>

            <Field
              component={TextInput}
              type="text"
              name="contractor"
              label="Contractor"
            />

            <Field
              component={TextInput}
              type="text"
              name="project_manager"
              label="Project Manager"
            />

            <Field
              component={TextInput}
              type="text"
              name="architect"
              label="Architect"
            />

            <Field
              component={TextInput}
              type="text"
              name="structural_engineer"
              label="Structural Engineer"
            />

            <Field
              component={TextInput}
              type="text"
              name="other_relevant_subcontractors"
              label="Other Relevant Sub Contractors"
            />

            <Field
              component={TextAreaInput}
              type="text"
              name="omni_experience_with_the_professional_team"
              label="Omni Experience with the professional team"
            />

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

export default Form5;

Form5.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
