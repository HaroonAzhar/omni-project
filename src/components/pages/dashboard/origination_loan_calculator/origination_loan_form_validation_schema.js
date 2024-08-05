import * as yup from "yup";

import { validationMsg } from "utils";

const originationLoanFormValidationSchema = yup.object().shape({
  propertyValue: yup.number().required(validationMsg.required),
  maximumLtv: yup.number().required(validationMsg.required),
  loanPeriod: yup.number().required(validationMsg.required),
  drawdownType: yup.string().required(validationMsg.required),
  interestRate: yup.number().required(validationMsg.required),
  arrangementFeePercent: yup.number().required(validationMsg.required),
  otherFees: yup.number().required(validationMsg.required),
  interestMethod: yup.string().when("drawdownType", {
    is: "single",
    then: yup.string().required(validationMsg.required),
    otherwise: yup.string(),
  }),
  numberOfFurtherDrawdowns: yup.number().when("drawdownType", {
    is: "multiple",
    then: yup.number().required(validationMsg.required),
    otherwise: yup.number(),
  }),
  totalFurtherDrawdownsAmount: yup.number().when("drawdownType", {
    is: "multiple",
    then: yup.number().required(validationMsg.required),
    otherwise: yup.number(),
  }),
});

export default originationLoanFormValidationSchema;
