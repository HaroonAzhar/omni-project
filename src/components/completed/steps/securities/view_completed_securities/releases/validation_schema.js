import * as yup from "yup";

import { validationMsg } from "utils";

const validationSchema = yup.object().shape({
  SaleType: yup.string().required(validationMsg.required),
  SalePrice: yup.number().required(validationMsg.required),
  DisposalToConnectedParty: yup.boolean().required(validationMsg.required),

  Notes: yup.string(),
});

export default validationSchema;
