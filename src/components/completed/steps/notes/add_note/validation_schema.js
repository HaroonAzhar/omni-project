import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  Text: yup.string().required(validationMsg.required),
});

export default validationSchema;
