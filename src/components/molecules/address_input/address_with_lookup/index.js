import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextInput } from "components/atoms";

import useSearchAddress from "./use_search_address";
import {
  StyledAddressLookupWrapper,
  StyledFindAddressButton,
} from "./styled_address_with_lookup";
import AddressTable from "./address_table";

const AddressWithLookup = ({
  onPlaceSelected,
  validate,
  disabled,
  prefix,
  form,
}) => {
  const [addressToSearch, setAddressToSearch] = useState("");
  const { addresses, formatAddress } = useSearchAddress(addressToSearch);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const inputFieldState = form.getFieldState(`${prefix}security_address`) || {};
  const inputSearch = inputFieldState.value;

  return (
    <>
      <StyledAddressLookupWrapper>
        {!disabled && (
          <>
            <Field
              component={TextInput}
              type="text"
              name={`${prefix}security_address`}
              label="Search address"
              placeholder="Enter postcode"
              validate={validate}
              disabled={disabled}
            />

            <StyledFindAddressButton
              type="button"
              kind="secondary"
              style={{ marginBottom: "15px" }}
              onClick={() => {
                setAddressToSearch(inputSearch);
                setCurrentPageIndex(0);
              }}
              disabled={disabled}
            >
              Find address
            </StyledFindAddressButton>
          </>
        )}

        {addresses && (
          <AddressTable
            addresses={addresses}
            addressSelected={(address) => {
              onPlaceSelected(formatAddress(address));
              form.change(`${prefix}security_address`, undefined);
            }}
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setCurrentPageIndex}
          />
        )}
      </StyledAddressLookupWrapper>
    </>
  );
};

export default AddressWithLookup;

AddressWithLookup.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  prefix: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
};
