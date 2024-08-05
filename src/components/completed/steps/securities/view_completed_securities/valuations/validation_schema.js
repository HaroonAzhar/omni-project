import * as yup from "yup";

import { validationMsg } from "utils";

import { otherOption } from "./valuation_options";

const validationSchema = yup.object().shape({
  Valuer: yup.string().required(validationMsg.required),
  ValuationDate: yup.date().required(validationMsg.required),
  ReportDate: yup.date().required(validationMsg.required),
  RecipientName: yup.string().required(validationMsg.required),
  ValuationType: yup.string().required(validationMsg.required),

  ValuationTypeOther: yup
    .string()
    .when("ValuationType", (ValuationType, schema) =>
      ValuationType === otherOption
        ? schema.required(validationMsg.required)
        : schema
    ),
  Notes: yup.string(),

  Valuation: yup.number().required(validationMsg.required),
  GDV: yup.number().required(validationMsg.required),
});

export default validationSchema;
