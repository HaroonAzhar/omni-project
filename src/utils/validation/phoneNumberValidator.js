import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import * as yup from "yup";

import validationMsg from "utils/validation_messages";

// Phone validator
const phoneNumberValidator = yup
  .string()
  .test("phoneNumberValidator", validationMsg.phoneNumber, (value) => {
    if (!value) {
      return true;
    }

    const parsedNumber = parsePhoneNumberFromString(value, "GB");

    if (parsedNumber) {
      return parsedNumber.isValid();
    }

    return false;
  });

export default phoneNumberValidator;
