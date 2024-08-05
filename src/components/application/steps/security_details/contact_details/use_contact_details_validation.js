import * as yup from "yup";

import { regex } from "utils";
import { useFieldValidation } from "hooks";
import message from "utils/validation_messages";

const validationSchemaForManual = yup.object().shape({
  email: yup.string(message.required).email(message.email),
  phone: yup
    .string(message.required)
    .matches(regex.phone, { message: message.phoneNumber }),
  name: yup.string(message.required),
});

export default ({ contactFor }) => {
  const dropdownName = `selected_contact_for_${contactFor}_valuation`;
  const validationForManual = useFieldValidation(validationSchemaForManual);

  return (name) => (value, formValues) =>
    formValues.details[dropdownName] === "manual" &&
    validationForManual(name, value);
};
