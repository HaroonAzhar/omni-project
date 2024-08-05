import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { useSelector } from "react-redux";

import {
  TextInput,
  Button,
  TextAreaInput,
  NavigationButtonContainer,
} from "components/atoms";
import { CountryInput, Question } from "components/molecules";

import { StyledToolContainer, StyledDateContainer } from "./toolbox_atoms";
import PlanningReferenceNumbers from "./planning_reference_numbers";

const Form4 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => finalizeStep({ data });
  const { indexOfElement = 0 } = useParams();

  const properties = useSelector((state) => state.application.properties);
  const propertyData = properties && properties[indexOfElement];
  const flowInputValues = propertyData && propertyData.valuation_report;

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        country: propertyData && propertyData.address.country,
        ...flowInputValues,
      }}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, submitting, values, form: { mutators } }) => (
        <form onSubmit={handleSubmit}>
          <StyledToolContainer>
            <Field
              component={TextInput}
              type="text"
              name="link_to_planning_permission"
              label="Link to Planning Permission"
            />

            <Question label="Planning required?" name="planning_required" />

            {values.planning_required === true && (
              <Field
                component={TextAreaInput}
                type="text"
                name="planning_details"
                label="Planning Details"
              />
            )}

            <PlanningReferenceNumbers mutators={mutators} />

            <CountryInput name="country" />

            <Question
              label="Site/development subject to Nitrate Neutrality?"
              name="nitrate_neutrality"
            />

            <Question label="Listed Grade I or II" name="listed_grade" />
            <Question label="SANG" name="sang" />
            <Question label="SSSI" name="sssi" />
            <Question label="ANOB" name="anob" />
            <Question label="Is EWS1 required?" name="esw1" />
            <Question label="Flood Zone" name="flood_zone" />
            <Question label="Green Belt" name="green_belt" />

            <Field
              component={TextInput}
              type="number"
              name="build_duration"
              label="Build Duration"
            />

            <StyledDateContainer>
              <Field
                component={TextInput}
                type="date"
                name="commencement_date_of_works"
                label="Expected Build Commencement Date"
                placeholder="10/10/2020"
              />
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

export default Form4;

Form4.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
