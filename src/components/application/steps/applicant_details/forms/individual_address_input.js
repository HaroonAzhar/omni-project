import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextInput, Button } from "components/atoms";
import { AddressInput } from "components/molecules";
import {
  StyledMultipleEntry,
  StyledMultipleEntriesTitle,
} from "components/dip_forms_steps/styled_dip_steps";

const IndividualAddressInput = ({
  name,
  index,
  onRemove,
  form,
  initialAddresses,
}) => {
  const isAddressPresent = [
    initialAddresses?.[index]?.line_1,
    initialAddresses?.[index]?.line_2,
    initialAddresses?.[index]?.town_city,
    initialAddresses?.[index]?.postcode,
    initialAddresses?.[index]?.country,
  ].some((element) => element !== undefined);

  const mustBeNumber = (value) => {
    // eslint-disable-next-line no-restricted-globals
    return isNaN(value) ? "Must be a number" : undefined;
  };

  const maxValue = (max) => (value) => {
    // eslint-disable-next-line no-restricted-globals
    return isNaN(value) || value <= max
      ? undefined
      : `Should not be greater than ${max}`;
  };

  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

  return (
    <StyledMultipleEntry>
      <StyledMultipleEntriesTitle>
        {`Address ${index + 1}`}
      </StyledMultipleEntriesTitle>

      <AddressInput
        name={name}
        form={form}
        shouldShowManualEdit={isAddressPresent}
        canSkipAddressValidation={true}
      />

      <Field
        component={TextInput}
        type="text"
        name={`${name}.how_long_here_years`}
        label="Time at this address - Years"
        placeholder="3"
        validate={mustBeNumber}
      />
      <Field
        component={TextInput}
        type="text"
        name={`${name}.how_long_here_months`}
        label="Time at this address - Months"
        placeholder="10"
        validate={composeValidators(mustBeNumber, maxValue(11))}
      />

      {name !== "addresses[0]" && (
        <Button kind="extra" type="button" onClick={onRemove}>
          - Remove address
        </Button>
      )}
    </StyledMultipleEntry>
  );
};

export default IndividualAddressInput;

IndividualAddressInput.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  initialAddresses: PropTypes.object,
};
