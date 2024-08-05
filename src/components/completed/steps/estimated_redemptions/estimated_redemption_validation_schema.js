import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  Date: yup.date().required(validationMsg.required),
  Amount: yup.number().required(validationMsg.required),
});

export default validationSchema;
