import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import styled from "styled-components/macro";

import { Button, Fieldset, RadioInput, PriceField } from "components/atoms";
import { AddressInput } from "components/molecules";

import {
  StyledMultipleEntriesTitle,
  StyledMultipleEntry,
} from "../styled_dip_steps";
import {
  fieldObjectValidation,
  fieldValidation,
  validationSchemaMortgage,
} from "./utils";

const StyledHide = styled.div`
  ${({ hide }) => hide && "display: none"}
`;

const SecurityInput = ({
  name,
  onRemove,
  form,
  index,
  touched,
  errors,
  valueData,
  isMultipleAdvance,
  canSkipAddressValidation,
}) => {
  return (
    <StyledMultipleEntry>
      <StyledMultipleEntriesTitle>
        {`Security ${index + 1}`}
      </StyledMultipleEntriesTitle>

      <AddressInput
        name={name}
        form={form}
        canSkipAddressValidation={canSkipAddressValidation}
        shouldShowManualEdit={!!valueData?.line_1}
      />

      <PriceField
        name={`${name}.SecurityInitialEstimation`}
        label="Current estimated open market value of security"
        placeholder="£££"
        validate={(value) =>
          fieldValidation("SecurityInitialEstimation", value)
        }
      />

      <PriceField
        name={`${name}.CurrentEstimated90DayMarketValue`}
        label="Current estimated 90 Day market value of security"
        placeholder="£££"
        validate={(value) =>
          fieldValidation("CurrentEstimated90DayMarketValue", value)
        }
      />

      {isMultipleAdvance && (
        <>
          <PriceField
            name={`${name}.Gdv`}
            label="GDV"
            placeholder="£££"
            validate={(value) => fieldValidation("Gdv", value)}
          />
          <PriceField
            name={`${name}.Estimated90DayGdv`}
            label="Estimated 90 Day GDV"
            placeholder="£££"
            validate={(value) => fieldValidation("Estimated90DayGdv", value)}
          />
        </>
      )}

      <Fieldset
        title="Security type"
        touched={touched.SecurityType}
        errors={errors.SecurityType}
      >
        <Field
          component={RadioInput}
          type="radio"
          validate={(value) => fieldValidation("SecurityType", value)}
          name={`${name}.SecurityType`}
          value="residential"
          label="Residential"
        />
        <Field
          component={RadioInput}
          type="radio"
          name={`${name}.SecurityType`}
          value="commercial"
          label="Commercial"
        />
        <Field
          component={RadioInput}
          type="radio"
          name={`${name}.SecurityType`}
          value="land"
          label="Land"
        />
        <Field
          component={RadioInput}
          type="radio"
          name={`${name}.SecurityType`}
          value="semi_commercial"
          label="Semi commercial"
        />
        <Field
          component={RadioInput}
          type="radio"
          name={`${name}.SecurityType`}
          value="development"
          label="Development"
        />
      </Fieldset>
      <Fieldset
        title="OPFL Charge Type"
        touched={touched.OpflType}
        errors={errors.OpflType}
      >
        <Field
          component={RadioInput}
          type="radio"
          validate={(value) => fieldValidation("OpflType", value)}
          name={`${name}.OpflType`}
          value="first_charge"
          label="First Charge"
        />

        <Field
          component={RadioInput}
          type="radio"
          name={`${name}.OpflType`}
          value="second_charge"
          label="Second Charge"
        />

        <StyledHide hide={valueData.OpflType !== "second_charge"}>
          <PriceField
            name={`${name}.ValueExistingMortgage`}
            label="Value of existing mortgage on the property"
            placeholder="£££"
            validate={(value, values) => {
              if (!values.securities[index]) return;

              return fieldObjectValidation(
                {
                  OpflType: values.securities[index].OpflType,
                  ValueExistingMortgage:
                    values.securities[index].ValueExistingMortgage,
                },
                validationSchemaMortgage
              );
            }}
          />
        </StyledHide>
      </Fieldset>
      {name !== "securities[0]" && (
        <Button kind="extra" type="button" onClick={onRemove}>
          - Remove security
        </Button>
      )}
    </StyledMultipleEntry>
  );
};

export default SecurityInput;

SecurityInput.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  valueData: PropTypes.object.isRequired,
  isMultipleAdvance: PropTypes.bool.isRequired,
  canSkipAddressValidation: PropTypes.bool,
};
