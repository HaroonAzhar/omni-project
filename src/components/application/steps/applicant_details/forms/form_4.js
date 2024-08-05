import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { FORM_ERROR } from "final-form";

import { Button } from "components/atoms";
import { StyledError } from "components/atoms/text_input/styled_text_input";
import { validationMsg } from "utils";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";
import IndividualAddressInput from "./individual_address_input";

const Form4 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement = 0 } = useParams();
  const individuals = useSelector((state) => state.application.individuals);
  const applicant = (individuals && individuals[indexOfElement]) || {};

  const onSubmit = (data) => {
    if (data.addresses) {
      const preparedAddresses = data.addresses.map(
        ({ line_1, line_2, town_city, ...rest }) => {
          return {
            address_line_1: line_1,
            address_line_2: line_2,
            city: town_city,
            ...rest,
          };
        }
      );

      data.addresses = preparedAddresses;
    }

    getOnSubmit(applicant, finalizeStep)(data);
  };

  const initialAddresses =
    applicant.addresses &&
    applicant.addresses.map(
      ({ address_line_1, address_line_2, city, ...rest }) => ({
        line_1: address_line_1,
        line_2: address_line_2,
        town_city: city,
        ...rest,
      })
    );

  const initialApplicant = {
    ...applicant,
    addresses: initialAddresses,
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={initialApplicant}
      validate={({ addresses }) => {
        let sum = 0;

        if (addresses) {
          sum = addresses.reduce(
            (acc, address) =>
              acc +
              Number((address.how_long_here_years || 0) * 12) +
              Number(address.how_long_here_months || 0),
            0
          );
          if (sum < 36) {
            return {
              [FORM_ERROR]: [validationMsg.cumulative3years],
            };
          }
        }
      }}
      render={({ handleSubmit, submitting, form, errors }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <FieldArray name="addresses">
              {({ fields }) =>
                fields.map((name, index) => (
                  <IndividualAddressInput
                    key={name}
                    name={name}
                    index={index}
                    form={form}
                    initialAddresses={initialAddresses}
                    onRemove={() => form.mutators.remove("addresses", index)}
                  />
                ))
              }
            </FieldArray>

            {errors[FORM_ERROR] && (
              <StyledError>{errors[FORM_ERROR]}</StyledError>
            )}

            <Button
              kind="extra"
              type="button"
              onClick={() => form.mutators.push("addresses", {})}
            >
              + Add another address
            </Button>
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

export default Form4;

Form4.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
