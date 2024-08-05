import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useSelector } from "react-redux";

import { Button } from "components/atoms";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "../styled_dip_steps";
import SecurityInput from "./security_input";

const SecurityDetailsForm = ({
  finalizeStep,
  goStepBack,
  canSkipAddressValidation,
}) => {
  const onSubmit = (data) => {
    data.securities =
      data.securities &&
      data.securities.map(
        ({ line_1, line_2, postcode, town_city, country, ...rest }) => ({
          SecurityAddressLine1: line_1,
          SecurityAddressLine2: line_2,
          SecurityPostcode: postcode,
          SecurityTownCity: town_city,
          SecurityCountry: country,
          ...rest,
        })
      );

    return finalizeStep({ data, stepId: "securities" });
  };

  const { securities, AdvanceType } = useSelector(({ dip }) => dip);

  const newSecurity = { isManualEditVisible: false };

  const preparedSecurities =
    securities &&
    securities.map(
      ({
        SecurityAddressLine1,
        SecurityAddressLine2,
        SecurityPostcode,
        SecurityTownCity,
        SecurityCountry,
        ...rest
      }) => ({
        ...rest,
        line_1: SecurityAddressLine1,
        line_2: SecurityAddressLine2,
        postcode: SecurityPostcode,
        town_city: SecurityTownCity,
        country: SecurityCountry,
      })
    );

  const getInitialSecurities = () => {
    if (!preparedSecurities || preparedSecurities.length === 0) {
      return [newSecurity];
    }
    return preparedSecurities;
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        securities: getInitialSecurities(),
      }}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, submitting, form, values, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <FieldArray name="securities">
              {({ fields }) =>
                fields.map((name, index) => (
                  <SecurityInput
                    key={name}
                    name={name}
                    onRemove={() => form.mutators.remove("securities", index)}
                    isMultipleAdvance={AdvanceType === "multiple"}
                    form={form}
                    index={index}
                    errors={errors}
                    touched={touched}
                    valueData={values.securities[index]}
                    canSkipAddressValidation={canSkipAddressValidation}
                  />
                ))
              }
            </FieldArray>

            <Button
              kind="extra"
              type="button"
              onClick={() => form.mutators.push("securities", newSecurity)}
            >
              + Add another security address
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

export default SecurityDetailsForm;

SecurityDetailsForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
  canSkipAddressValidation: PropTypes.bool,
};
