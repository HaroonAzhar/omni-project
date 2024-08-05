import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  Amount: yup.number().min(0).required(validationMsg.required),
  ActualDate: yup.string().required(validationMsg.required),
  Description: yup.string(),
});

export default validationSchema;
