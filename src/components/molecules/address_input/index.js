import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import validationMsg from "utils/validation_messages";
import { Button } from "components/atoms";

import AddressWithLookup from "./address_with_lookup";
import AddressWithAutocomplete from "./address_with_autocomplete";
import ManualAddressEdit from "./manual_address_edit";
import parseGoogleAutocompleteResponse from "./parse_google_autocomplete_response";

const shouldShowPostcoderAddress = () => {
  if (process.env.REACT_APP_POSTCODER_API_KEY) {
    return true;
  } else {
    return false;
  }
};

const isPostocderAddressVisible = shouldShowPostcoderAddress();

const AddressInput = ({
  name,
  form,
  canSkipAddressValidation,
  shouldShowManualEdit = false,
  disabled,
  isViewOnly = false,
}) => {
  const [isManuallyEditVisible, setIsManuallyEditVisible] = useState(
    shouldShowManualEdit
  );
  const prefix = name ? `${name}.` : "";

  useEffect(() => {
    setIsManuallyEditVisible(shouldShowManualEdit);
  }, [shouldShowManualEdit]);

  const setAddress = (receivedAddress) => {
    Object.entries(receivedAddress).forEach(([address_entry, value]) =>
      form.change(`${prefix}${address_entry}`, value)
    );
  };

  return (
    <>
      {!isPostocderAddressVisible && (
        <AddressWithAutocomplete
          name={name}
          prefix={prefix}
          visible={!isManuallyEditVisible}
          onPlaceSelected={(_, place) => {
            setIsManuallyEditVisible(true);
            const receivedAddress = parseGoogleAutocompleteResponse(place);
            setAddress(receivedAddress);
            form.change(`${prefix}security_address`, undefined);
          }}
          validate={() => {
            if (canSkipAddressValidation) return;
            return !isManuallyEditVisible && validationMsg.addressRequired;
          }}
          disabled={disabled}
        />
      )}

      {!isManuallyEditVisible && (
        <>
          <AddressWithLookup
            name={name}
            prefix={prefix}
            visible={!isManuallyEditVisible}
            onPlaceSelected={(receivedAddress) => {
              setIsManuallyEditVisible(true);
              setAddress(receivedAddress);
            }}
            validate={() => {
              if (canSkipAddressValidation) return;
              return !isManuallyEditVisible && validationMsg.addressRequired;
            }}
            form={form}
            disabled={disabled}
          />
          <Button
            kind="extra"
            type="button"
            onClick={() => setIsManuallyEditVisible(true)}
            style={disabled ? { display: "none" } : { marginBottom: "90px" }}
            disabled={disabled}
          >
            + Cancel Search
          </Button>
        </>
      )}

      {isManuallyEditVisible && (
        <>
          {!isViewOnly && (
            <Button
              kind="extra"
              type="button"
              onClick={() => setIsManuallyEditVisible(false)}
              style={{ marginBottom: "15px" }}
            >
              + Use Search
            </Button>
          )}
          <ManualAddressEdit
            prefix={prefix}
            visible={isManuallyEditVisible}
            canSkipAddressValidation={canSkipAddressValidation}
            disabled={disabled}
          />
        </>
      )}
    </>
  );
};

AddressInput.propTypes = {
  name: PropTypes.string,
  form: PropTypes.object,
  canSkipAddressValidation: PropTypes.bool,
  shouldShowManualEdit: PropTypes.bool,
  disabled: PropTypes.bool,
  isViewOnly: PropTypes.bool,
};

export default AddressInput;
