import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  Type: yup.string().required(validationMsg.required),
  Date: yup.string().required(validationMsg.required),
});

export default validationSchema;
