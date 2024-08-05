import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  TransactionType: yup.string().required(validationMsg.required),
  ActualDate: yup.string().required(validationMsg.required),
  Amount: yup.number().positive().required(validationMsg.required),
  Description: yup.string(),
});

export default validationSchema;
