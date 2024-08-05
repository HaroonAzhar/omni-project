import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  SecurityInitialEstimation: yup
    .number()
    .positive()
    .required(validationMsg.required),
  CurrentEstimated90DayMarketValue: yup.number().positive(),
  Estimated90DayGdv: yup.string(),
  SecurityType: yup.string().required(validationMsg.required),
  OpflType: yup.string().required(validationMsg.required),
  Gdv: yup.string().required(validationMsg.required),
});

const addressValidationSchema = yup.object().shape({
  SecurityAddressLine1: yup.string().required(validationMsg.required),
  SecurityAddressLine2: yup.string().nullable(),
  SecurityTownCity: yup.string().required(validationMsg.required),
  SecurityPostcode: yup.string().required(validationMsg.required),
  SecurityCountry: yup.string().required(validationMsg.required),
});

export const validationSchemaMortgage = yup.object().shape({
  OpflType: yup.string().required(validationMsg.required),
  ValueExistingMortgage: yup.string().when("OpflType", {
    is: "second_charge",
    then: yup.string().required(validationMsg.required),
  }),
});

export const fieldObjectValidation = (values, schema) => {
  try {
    schema.validateSync(values);
  } catch (validation_error) {
    return validation_error.errors[0];
  }
};

export const fieldValidation = (fieldName, value, canSkipAddressValidation) => {
  const schema = canSkipAddressValidation
    ? validationSchema
    : validationSchema.concat(addressValidationSchema);

  try {
    yup.reach(schema, fieldName).validateSync(value);
  } catch (validation_error) {
    return validation_error.errors && validation_error.errors[0];
  }
};
