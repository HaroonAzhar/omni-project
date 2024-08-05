import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import moment from "moment";
import * as yup from "yup";
import { OnChange } from "react-final-form-listeners";

import { TextInput, Button, SelectInput } from "components/atoms";
import { Question } from "components/molecules";
import { validationMsg, regex, parseUndefinedToEmptyString } from "utils";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "../get_on_submit";
import { StyledField } from "../styled_form_3";
import NationalitiesDropdown from "../nationalities_dropdown";
import { ukResidentialStatusOptions } from "./status_options";
import setNationalityFilters from "./set_nationality_filters";

const informationRegardingPropertyResidences = [
  "Homeowner",
  "Renting",
  "Living with Parents and/or other Family Member",
];
const informationRegardingPropertyResidenceOptions = [
  { value: undefined, label: "Choose one" },
  ...informationRegardingPropertyResidences.map((status) => ({
    value: status,
    label: status,
  })),
];

const Form3 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement = 0 } = useParams();
  const individuals = useSelector((state) => state.application.individuals);
  const applicant = (individuals && individuals[indexOfElement]) || {};
  const [
    permanentRightToResideVisible,
    setPermanentRightToResideVisible,
  ] = useState(false);

  const [ukResidentialStatusVisible, setUkResidentialStatusVisible] = useState(
    false
  );

  const [residentialStatuses, setResidentialStatuses] = useState(
    ukResidentialStatusOptions
  );

  useEffect(() => {
    setNationalityFilters(
      null,
      applicant,
      { change: () => undefined },
      setPermanentRightToResideVisible,
      setUkResidentialStatusVisible,
      setResidentialStatuses
    );
  }, [applicant]);

  const onSubmit = getOnSubmit(applicant, finalizeStep);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={applicant}
      render={({ values, handleSubmit, submitting, form }) => {
        const onChangeImplementation = (value) =>
          setNationalityFilters(
            value,
            values,
            form,
            setPermanentRightToResideVisible,
            setUkResidentialStatusVisible,
            setResidentialStatuses
          );
        return (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <StyledField
                component={TextInput}
                type="date"
                name="personal_data.date_of_birth"
                label="Date of birth"
                placeholder="10/10/2020"
                validate={(value) => {
                  if (!value) {
                    return validationMsg.required;
                  }

                  try {
                    const start = moment(value);
                    const stop = moment();

                    const diff = stop.diff(start, "days");

                    if (diff < 0) {
                      return validationMsg.dateInFuture;
                    }

                    if (diff < 365 * 18) {
                      return validationMsg.old18;
                    }

                    return undefined;
                  } catch (e) {
                    return validationMsg.mustBeDate;
                  }
                }}
              />

              <Field
                component={TextInput}
                type="text"
                name="personal_data.city_of_birth"
                label="Place of birth - city"
                placeholder="London"
                parse={parseUndefinedToEmptyString}
              />
              <Field
                component={TextInput}
                type="text"
                name="personal_data.country_of_birth"
                label="Place of birth - country"
                placeholder="UK"
                parse={parseUndefinedToEmptyString}
              />

              <Field
                component={TextInput}
                type="text"
                name="personal_data.insurance_number"
                label="National insurance number"
                placeholder="AA123456B"
                parse={parseUndefinedToEmptyString}
                validate={(value) => {
                  const isValid = yup
                    .string()
                    .matches(regex.nationalInsuranceNumber)
                    .isValidSync(value);

                  return !isValid && validationMsg.insuranceNumber;
                }}
              />

              <Field
                component={NationalitiesDropdown}
                type="text"
                name="personal_data.nationality"
                label="Nationality"
                placeholder="British"
                parse={parseUndefinedToEmptyString}
              />

              <OnChange name="personal_data.nationality">
                {onChangeImplementation}
              </OnChange>

              <Question
                label="Dual national?"
                name="personal_data.has_dual_nationality"
              />
              <OnChange name="personal_data.has_dual_nationality">
                {(value) => {
                  onChangeImplementation(value);
                  if (value === false) {
                    form.change("personal_data.second_nationality", null);
                  }
                }}
              </OnChange>

              {values.personal_data &&
                values.personal_data.has_dual_nationality && (
                  <Field
                    component={NationalitiesDropdown}
                    type="text"
                    name="personal_data.second_nationality"
                    label="Second Nationality"
                    placeholder="British"
                    parse={parseUndefinedToEmptyString}
                  />
                )}

              <OnChange name="personal_data.second_nationality">
                {onChangeImplementation}
              </OnChange>

              {permanentRightToResideVisible && (
                <Question
                  label="Do you have the permanent right to reside"
                  name="personal_data.permanent_resident"
                />
              )}

              {ukResidentialStatusVisible && (
                <Field
                  component={SelectInput}
                  type="text"
                  name="personal_data.uk_residential_status"
                  label="UK residential status"
                  options={residentialStatuses}
                  parse={parseUndefinedToEmptyString}
                />
              )}

              <Field
                component={SelectInput}
                type="text"
                name="personal_data.information_regarding_property_residence"
                label="Information regarding property residence"
                parse={parseUndefinedToEmptyString}
                options={informationRegardingPropertyResidenceOptions}
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
        );
      }}
    />
  );
};
export default Form3;

Form3.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
