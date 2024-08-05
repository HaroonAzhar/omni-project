import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import createDecorator from "final-form-calculate";

import {
  Fieldset,
  RadioInput,
  TitleField,
  PriceField,
  TextInput,
  Button,
} from "components/atoms";
import { FlowControlButtons } from "components/molecules";
import { validationMsg } from "utils";
import {
  StyledMainFormContent,
  StyledMultipleEntry,
} from "components/dip_forms_steps/styled_dip_steps";

import getOnSubmit from "./get_on_submit";

const isSecondCharge = (values) => {
  return (
    values &&
    values.charge &&
    values.charge.opfl_charge_type === "second_charge"
  );
};

const LenderInput = ({ name, onRemove, values }) => (
  <StyledMultipleEntry>
    <Field
      component={TextInput}
      type="text"
      name={`${name}.name`}
      label="Current lender"
      placeholder="John Doe"
      disabled={!isSecondCharge(values)}
    />

    <PriceField
      name={`${name}.current_mortgage_outstanding`}
      label="Current mortgage outstanding"
      disabled={!isSecondCharge(values)}
    />
    {name !== "charge.lenders[0]" && (
      <Button kind="extra" type="button" onClick={onRemove}>
        - Remove Lender
      </Button>
    )}
  </StyledMultipleEntry>
);

const sumMortgages = (lenders) =>
  lenders.reduce(
    (sum, lender) => sum + Number(lender.current_mortgage_outstanding || 0),
    0
  );

const sumMortgagesCalculator = createDecorator({
  field: ["lenders", /lenders\[\d\].*/],
  updates: {
    "charge.current_mortgage_outstanding": (ignoredValue, allValues) =>
      sumMortgages(allValues.charge.lenders || []),
  },
});

const getInitialValues = (property) => {
  const initialValues = {
    ...property,
  };

  if (initialValues.charge) {
    initialValues.charge.security_owner =
      initialValues.charge.security_owner || "applicant";
  }

  return initialValues;
};

const Form3 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement: indexOfProperty } = useParams();
  const properties = useSelector((state) => state.application.properties);
  const initialCharge = { lenders: [{}] };
  const property = (properties && properties[indexOfProperty]) || {
    charge: initialCharge,
  };

  if (!property.charge) property.charge = initialCharge;
  if (!property.charge.lenders) property.charge.lenders = [{}];

  const onSubmit = getOnSubmit(property, finalizeStep);

  const initialValues = getInitialValues(property);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
      decorators={[sumMortgagesCalculator]}
      render={({
        handleSubmit,
        submitting,
        form: { mutators, change },
        values,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <Fieldset title="Charge Offered" disabled={true}>
                <Field
                  component={RadioInput}
                  type="radio"
                  name="charge.opfl_charge_type"
                  value="first_charge"
                  label="First"
                  disabled={true}
                />
                <Field
                  component={RadioInput}
                  type="radio"
                  name="charge.opfl_charge_type"
                  value="second_charge"
                  label="Second"
                  disabled={true}
                />
              </Fieldset>

              {isSecondCharge(values) && (
                <>
                  <PriceField
                    name="charge.current_mortgage_outstanding"
                    label="Total Current mortgage outstanding"
                    placeholder="£££"
                    disabled={true}
                    validate={(value) => {
                      const currentValue = parseFloat(
                        property.details && property.details.current_value
                      );

                      // eslint-disable-next-line no-restricted-globals
                      if (isNaN(currentValue)) {
                        return;
                      }

                      const isBigger = parseFloat(value) >= currentValue;

                      return isBigger
                        ? validationMsg.currentMortgageMoreThanCurrentValue
                        : undefined;
                    }}
                  />

                  <FieldArray name="charge.lenders">
                    {({ fields }) => {
                      return fields.map((name, index) => (
                        <LenderInput
                          key={name}
                          name={name}
                          onRemove={() => {
                            mutators.remove("charge.lenders", index);
                            const lenders = values.charge.lenders.filter(
                              (lender, lenderIndex) => lenderIndex !== index
                            );
                            change(
                              "charge.current_mortgage_outstanding",
                              sumMortgages(lenders)
                            );
                          }}
                          index={index}
                          values={values}
                        />
                      ));
                    }}
                  </FieldArray>

                  <Button
                    kind="extra"
                    type="button"
                    onClick={() => mutators.push("charge.lenders", {})}
                  >
                    + Add another lender
                  </Button>
                </>
              )}

              <Fieldset title="Security Owner">
                <Field
                  component={RadioInput}
                  type="radio"
                  name="charge.security_owner"
                  value="applicant"
                  label="Applicant"
                />
                <Field
                  component={RadioInput}
                  type="radio"
                  name="charge.security_owner"
                  value="third_party"
                  label="3rd Party"
                />
              </Fieldset>

              {values.charge && values.charge.security_owner === "third_party" && (
                <>
                  <TitleField
                    name="charge.security_owner_title"
                    label="Title"
                  />
                  <Field
                    component={TextInput}
                    type="text"
                    name="charge.security_owner_forename"
                    label="Forename"
                    placeholder="Anna"
                  />
                  <Field
                    component={TextInput}
                    type="text"
                    name="charge.security_owner_middle_name"
                    label="Middle name(s)"
                    placeholder="Maria"
                  />
                  <Field
                    component={TextInput}
                    type="text"
                    name="charge.security_owner_surname"
                    label="Surname"
                    placeholder="Jons"
                  />
                </>
              )}
            </StyledMainFormContent>

            <FlowControlButtons
              onBack={goStepBack}
              isContinueDisabled={submitting}
            />
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

LenderInput.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};
