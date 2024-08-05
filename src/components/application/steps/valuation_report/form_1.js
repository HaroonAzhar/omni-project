import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";

import {
  TextInput,
  Button,
  SelectInput,
  NavigationButtonContainer,
} from "components/atoms";

import { StyledToolContainer, StyledDateContainer } from "./toolbox_atoms";

const Form1 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => {
    delete data.security_type;
    delete data.opfl_charge_type;

    return finalizeStep({ data });
  };
  const { indexOfElement = 0 } = useParams();

  const properties = useSelector((state) => state.application.properties);
  const propertyData = properties && properties[indexOfElement];
  const flowInputValues = propertyData && propertyData.valuation_report;

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        security_type: propertyData && propertyData.details.security_type,
        opfl_charge_type: propertyData && propertyData.charge.opfl_charge_type,
        ...flowInputValues,
      }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <StyledToolContainer>
            <Field
              component={SelectInput}
              type="text"
              name="security_type"
              label="Security Type"
              disabled
              options={[
                {
                  value: "",
                  label: " ",
                },
                {
                  value: "residential",
                  label: "Residential",
                },
                {
                  value: "commercial",
                  label: "Commercial",
                },
                {
                  value: "land",
                  label: "Land",
                },
                {
                  value: "semi_commercial",
                  label: "Semi commercial",
                },
                {
                  value: "development",
                  label: "Development",
                },
                {
                  value: "office_block",
                  label: "Office Block",
                },
                {
                  value: "airspace_development",
                  label: "Airspace development",
                },
                {
                  value: "other",
                  label: "Other",
                },
              ]}
            />

            <Field
              component={SelectInput}
              type="select"
              name="opfl_charge_type"
              label="Charge"
              disabled
              options={[
                {
                  value: "",
                  label: " ",
                },
                {
                  value: "first_charge",
                  label: "First",
                },
                {
                  value: "second_charge",
                  label: "Second",
                },
              ]}
            />

            <Field
              component={SelectInput}
              type="select"
              name="report_status"
              label="Status"
              options={[
                {
                  value: "instructed",
                  label: "Instructed",
                },
                {
                  value: "followed_up",
                  label: "Followed up",
                },
                {
                  value: "received",
                  label: "Received",
                },
              ]}
            />

            <Field
              component={TextInput}
              type="text"
              name="surveyor"
              label="Surveyor"
            />

            <Field
              component={TextInput}
              type="text"
              name="name_of_the_individual_surveyor"
              label="Individual Surveyor"
            />

            <Field
              component={SelectInput}
              type="select"
              name="valuation_basis"
              label="Valuation Basis"
              options={[
                {
                  value: "rics_valuation",
                  label: "RICS Valuation",
                },
                {
                  value: "reinspection_valuation",
                  label: "Reinspection Valuation",
                },
                {
                  value: "progress_report",
                  label: "Progress Report",
                },
                {
                  value: "retype",
                  label: "Retype",
                },
                {
                  value: "audit_rics_valuation",
                  label: "Audit RICS Valuation",
                },
                {
                  value: "customer_provided",
                  label: "Customer Provided",
                },
              ]}
            />

            <Field
              component={SelectInput}
              type="select"
              name="valuation_method"
              label="Valuation Method"
              options={[
                {
                  value: "comparables",
                  label: "Comparables",
                },
                {
                  value: "residual_value",
                  label: "Residual value",
                },
              ]}
            />

            <StyledDateContainer>
              <Field
                component={TextInput}
                type="date"
                name="report_date"
                label="Report Date"
                placeholder="10/10/2020"
              />
              <Field
                component={TextInput}
                type="date"
                name="inspection_date"
                label="Inspection Date"
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

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
