import * as yup from "yup";

import { validationMsg } from "utils";

import validationSchemaValuation from "../view_completed_securities/valuations/validation_schema";

const validationSchema = validationSchemaValuation.shape({
  Note: yup.string().required(validationMsg.required),
});

export default validationSchema;
