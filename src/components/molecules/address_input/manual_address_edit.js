import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { fieldValidation } from "components/dip_forms_steps/security_details_form/utils";
import { TextInput } from "components/atoms";
import { CountryInput } from "components/molecules";
import { parseUndefinedToEmptyString } from "utils";

export const defaultNames = {
  line_1: "line_1",
  line_2: "line_2",
  town_city: "town_city",
  postcode: "postcode",
  country: "country",
};

const ManualAddressEdit = ({
  prefix,
  canSkipAddressValidation,
  disabled,
  names = defaultNames,
}) => (
  <>
    <Field
      component={TextInput}
      type="text"
      name={`${prefix}${names.line_1}`}
      disabled={disabled}
      label="Address Line 1"
      validate={(value) =>
        fieldValidation(
          "security_address_line_1",
          value,
          canSkipAddressValidation
        )
      }
      placeholder="Omni"
    />
    <Field
      component={TextInput}
      type="text"
      name={`${prefix}${names.line_2}`}
      label="Address Line 2"
      disabled={disabled}
      validate={(value) =>
        fieldValidation(
          "security_address_line_2",
          value,
          canSkipAddressValidation
        )
      }
      placeholder="7 Air Street"
    />
    <Field
      component={TextInput}
      type="text"
      name={`${prefix}${names.town_city}`}
      label="Town/City"
      validate={(value) =>
        fieldValidation("security_town_city", value, canSkipAddressValidation)
      }
      placeholder="London"
      disabled={disabled}
    />
    <Field
      component={TextInput}
      type="text"
      name={`${prefix}${names.postcode}`}
      label="Postcode"
      validate={(value) =>
        fieldValidation("security_postcode", value, canSkipAddressValidation)
      }
      placeholder="W1J 0AB"
      disabled={disabled}
      parse={parseUndefinedToEmptyString}
    />

    <CountryInput
      validate={(value) =>
        fieldValidation("security_country", value, canSkipAddressValidation)
      }
      disabled={disabled}
      name={`${prefix}${names.country}`}
    />
  </>
);

export default ManualAddressEdit;

ManualAddressEdit.propTypes = {
  prefix: PropTypes.string.isRequired,
  canSkipAddressValidation: PropTypes.bool,
  disabled: PropTypes.bool,
  names: PropTypes.object,
};
