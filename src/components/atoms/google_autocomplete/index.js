import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "react-google-autocomplete";
import styled from "styled-components/macro";

import { textInput } from "styles/global_blocks";
import {
  StyledLabel,
  StyledLabelText,
  StyledError,
} from "components/atoms/text_input/styled_text_input";

const AutoCompleteWrapper = styled.div`
  & .google_autocomplete {
    ${textInput}
  }
`;

const defaultOnPlaceSelected = (input, place) =>
  input.onChange(place.formatted_address);
/* eslint-disable react/jsx-props-no-spreading */

const GoogleAutocomplete = ({
  input,
  label,
  meta: { error, touched },
  onPlaceSelected,
  disabled,
}) => {
  return (
    <StyledLabel>
      {label && <StyledLabelText>{label}</StyledLabelText>}

      <AutoCompleteWrapper
        isCorrect={touched && !error}
        isError={touched && !!error}
        isValue={!!input.value}
      >
        <Autocomplete
          onPlaceSelected={(place) =>
            onPlaceSelected
              ? onPlaceSelected(input, place)
              : defaultOnPlaceSelected(input, place)
          }
          types={["address"]}
          componentRestrictions={{ country: "uk" }}
          className="google_autocomplete"
          {...input}
          disabled={disabled}
        />
        {touched && error && <StyledError>{error}</StyledError>}
      </AutoCompleteWrapper>
    </StyledLabel>
  );
};

GoogleAutocomplete.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onPlaceSelected: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GoogleAutocomplete;
