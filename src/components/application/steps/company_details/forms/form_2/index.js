import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as yup from "yup";

import {
  formValidation,
  // validationMsg
} from "utils";
import { Button, TextInput, RadioInput, Fieldset } from "components/atoms";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import { getCompany } from "../../../../helpers/company_data_selector";

const StyledFieldset = styled(Fieldset)`
  & > div {
    width: 500px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  & > div > label {
    width: 50%;
  }
`;

const validationSchema = yup.object().shape({});

const companyTypes = [
  {
    value: "sole_trader",
    label: "Sole trader",
  },
  {
    value: "partnership",
    label: "Partnership",
  },
  {
    value: "llp",
    label: "LLP",
  },
  {
    value: "plc",
    label: "PLC",
  },
  {
    value: "ltd",
    label: "Limited Company",
  },
  {
    value: "charity",
    label: "Charity",
  },
  {
    value: "church",
    label: "Church",
  },
  {
    value: "club",
    label: "Club",
  },
  {
    value: "society",
    label: "Society",
  },
  {
    value: "local_authority",
    label: "Local authority",
  },
  {
    value: "government_departments",
    label: "Government department",
  },
  {
    value: "other",
    label: "Other",
  },
];

const Form2 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => {
    if (data.base_data.company_type === "other") {
      data.base_data.company_type = data.base_data.other_company_type;
      delete data.base_data.other_company_type;
    }
    return finalizeStep({
      data: { ...data, type_of_applicant: "company" },
      step_id: "company_details_form",
    });
  };
  const validate = async (values) => formValidation(validationSchema, values);

  const { base_data = {} } = useSelector(getCompany);

  const companyType = base_data.company_type;
  const isTypeAvailable = companyTypes.some(
    (item) => item.value === companyType
  );

  const initialValues = {
    base_data: {
      company_type: isTypeAvailable ? companyType : "other",
      other_company_type: !isTypeAvailable ? companyType : undefined,
    },
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, form, errors, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <StyledFieldset
              title="Company type"
              touched={touched.company_type}
              error={errors.company_type}
              shouldUseRadioContainer={true}
            >
              {companyTypes.map((item) => (
                <Field
                  component={RadioInput}
                  type="radio"
                  name="base_data.company_type"
                  value={item.value}
                  label={item.label}
                  key={`company-type-${item.value}`}
                />
              ))}
            </StyledFieldset>

            {values.base_data.company_type === "other" && (
              <Field
                component={TextInput}
                type="text"
                name="base_data.other_company_type"
                label="Please, specify type of your company"
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

export default Form2;

Form2.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
