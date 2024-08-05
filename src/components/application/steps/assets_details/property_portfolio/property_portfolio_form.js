import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import { OnChange } from "react-final-form-listeners";

import { AddressInput, Question } from "components/molecules";
import { Button, TextInput, PriceField } from "components/atoms";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

export const StyledMultiColumnsInputsContainer = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  width: 100%;
  & input[type="text"] {
    width: 420px;
  }
`;

export const StyledLeftColumn = styled.div`
  > div {
    > button {
      display: flex;
      left: 0px;
      position: relative;
      top: 12px;
    }

    > div {
      > table {
        > tbody {
          > tr {
            > td {
              > button {
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
`;
export const StyledRightColumn = styled.div`
  padding-left: 20px;
`;

const PropertyPortfolioForm = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement = 0, indexOfProperty = 0 } = useParams();
  const individuals = useSelector((state) => state.application.individuals);
  const applicant = (individuals && individuals[indexOfElement]) || {};
  const property =
    (applicant.property_portfolio &&
      applicant.property_portfolio[indexOfProperty]) ||
    {};

  const onSubmit = (propertyChanged) => {
    const applicantProperty = {
      ...propertyChanged,
      address_line_1: propertyChanged.line_1,
      address_line_2: propertyChanged.line_2,
      city: propertyChanged.town_city,
    };

    delete applicantProperty.line_1;
    delete applicantProperty.line_2;
    delete applicantProperty.town_city;

    const toSave = {
      ...applicantProperty,
    };

    if (applicant.property_portfolio) {
      applicant.property_portfolio[indexOfProperty] = toSave;
    } else {
      applicant.property_portfolio = [toSave];
    }

    finalizeStep({ data: applicant });
  };

  const applicantProperty = {
    line_1: property.address_line_1,
    line_2: property.address_line_2,
    town_city: property.city,
    ...property,
  };

  const isAddressPresent = [
    applicantProperty?.line_1,
    applicantProperty?.line_2,
    applicantProperty?.town_city,
    applicantProperty?.postcode,
    applicantProperty?.country,
  ].some((element) => element !== undefined);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={applicantProperty}
      render={({ handleSubmit, submitting, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <Question
              label="Is this where the applicant resides?"
              name="is_where_resides"
            />
            <OnChange name="is_where_resides">
              {(isWhereResidesValue) => {
                if (isWhereResidesValue === false) return;
                const [applicantAddress = {}] = applicant?.addresses ?? [];
                const mappedApplicantAddress = {
                  country: applicantAddress.country,
                  postcode: applicantAddress.postcode,
                  line_1: applicantAddress.address_line_1,
                  line_2: applicantAddress.address_line_2,
                  town_city: applicantAddress.city,
                };
                Object.entries(mappedApplicantAddress)
                  .filter(([key]) => key !== "how_long_here")
                  .forEach(([key, value]) => form.change(key, value));
              }}
            </OnChange>
            <StyledMultiColumnsInputsContainer>
              <StyledLeftColumn>
                <AddressInput
                  form={form}
                  shouldShowManualEdit={isAddressPresent}
                  canSkipAddressValidation={true}
                />
              </StyledLeftColumn>

              <StyledRightColumn>
                <Field
                  component={TextInput}
                  type="text"
                  name="name_of_lender"
                  label="Name of lender"
                  placeholder="XXX"
                />
                <PriceField
                  name="estimated_value"
                  label="Estimated value"
                  placeholder="£££"
                />
                <PriceField
                  name="current_debt"
                  label="Current debt (£)"
                  placeholder="£££"
                />
                <PriceField
                  name="monthly_mortgage"
                  label="Current monthly mortgage payment (£)"
                  placeholder="£££"
                />
                <PriceField
                  name="monthly_rental"
                  label="Current monthly rental received (£)"
                  placeholder="£££"
                />
              </StyledRightColumn>
            </StyledMultiColumnsInputsContainer>
          </StyledMainFormContent>

          <StyledButtonsContainer>
            <Button kind="fade" type="button" onClick={goStepBack}>
              Back
            </Button>

            <Button type="submit" disabled={submitting}>
              Save
            </Button>
          </StyledButtonsContainer>
        </form>
      )}
    />
  );
};

export default PropertyPortfolioForm;

PropertyPortfolioForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
