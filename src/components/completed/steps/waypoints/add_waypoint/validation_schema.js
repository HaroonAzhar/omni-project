import * as yup from "yup";

import { validationMsg } from "utils";

import baseValidationSchema from "../validation_schema";

const validationSchema = yup
  .object()
  .shape({
    RecurringEvent: yup.string().required(validationMsg.required),
    NumberOfTimesToRepeat: yup
      .number()
      .positive()
      .when("RecurringEvent", (recurringEvent, schema) =>
        recurringEvent !== "not_recurring"
          ? schema.required(validationMsg.required)
          : schema.nullable()
      ),
  })
  .concat(baseValidationSchema);

export default validationSchema;
