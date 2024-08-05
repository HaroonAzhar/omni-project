import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  Notes: yup.string().required(validationMsg.required),
});

export default validationSchema;
