import React from "react";
import PropTypes from "prop-types";
import { Field, useField } from "react-final-form";

import { TextInput } from "components/atoms";

import {
  proofOfAddressOptions,
  additionalProofOfAddressOptions,
  proofOfIdOptions,
} from "./options";
import { ReferralSelectField, useReferralField } from "./referral";

const useProofOptions = () => {
  const proofOfIdInput = useField("proof_of_id");
  const proofAddressIfInput = useField("proof_of_address");

  const { value: proofOfAddressValue = {} } = proofAddressIfInput.input;
  const { value: proofOfIdValue = {} } = proofOfIdInput.input;

  const { innerValue: proofOfAddressInnerValue = "" } = proofOfAddressValue;
  const { innerValue: proofOfIdInnerValue = "" } = proofOfIdValue;

  const valueToSkipFor = {
    proof_of_id: proofOfAddressInnerValue.replace("*", ""),
    proof_of_address: proofOfIdInnerValue.replace("*", ""),
  };

  const options = {
    proof_of_id: proofOfIdOptions,
    proof_of_address: proofOfAddressOptions,
    additional_proof_of_address: additionalProofOfAddressOptions,
  };

  return (name) => {
    return options[name].filter(({ value }) => value !== valueToSkipFor[name]);
  };
};

const shouldShowExtraSelect = (values, showAdditionalProofOfAddress) => {
  return (
    showAdditionalProofOfAddress &&
    values.proof_of_address?.innerValue !== "BANK_STATEMENT"
  );
};

const ProofOf = ({ disabled, values, showAdditionalProofOfAddress = true }) => {
  const getProofOptions = useProofOptions();
  const { parse, format } = useReferralField();
  return (
    <div>
      <ReferralSelectField
        label="Proof of ID"
        name="proof_of_id"
        options={getProofOptions("proof_of_id")}
        disabled={disabled}
      />

      <ReferralSelectField
        name="proof_of_address"
        options={getProofOptions("proof_of_address")}
        label="Proof of Address"
        disabled={disabled}
      />
      {shouldShowExtraSelect(values, showAdditionalProofOfAddress) && (
        <ReferralSelectField
          name="additional_proof_of_address"
          options={additionalProofOfAddressOptions}
          label="Additional Proof of Address"
          disabled={disabled}
        />
      )}
      <Field
        name="proof_of_id_expiry_date"
        label="Expiry Date - Proof of ID "
        component={TextInput}
        type="date"
        disabled={disabled}
        parse={parse}
        format={format}
      />
    </div>
  );
};

export default ProofOf;

ProofOf.propTypes = {
  disabled: PropTypes.bool,
  values: PropTypes.object,
  showAdditionalProofOfAddress: PropTypes.bool,
};
