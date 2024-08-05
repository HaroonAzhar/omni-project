import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  Name: yup.string().required(validationMsg.required),
  DueDate: yup.string().required(validationMsg.required),
  DueTime: yup.string().nullable(),
  IsCompleted: yup.boolean().required(validationMsg.required),
  Notes: yup.string().nullable(),
  Category: yup.string().required(validationMsg.required),
  OtherWaypointDescription: yup
    .string()
    .nullable()
    .when("Name", (Name, schema) =>
      Name === "Other" ? schema.required(validationMsg.required) : schema
    ),
});

export default validationSchema;
