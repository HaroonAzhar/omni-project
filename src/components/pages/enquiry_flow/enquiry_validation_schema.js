import * as yup from "yup";

import { validationMsg } from "utils";

const enquiryValidationSchema = yup.object().shape({
  EnquiryName: yup.string().required(validationMsg.required),
  FkBrokerCompanyId: yup.number().required(validationMsg.required),
  FkBrokerIndividualId: yup.number().required(validationMsg.required),
  FkOriginatorId: yup.number().required(validationMsg.required),

  EstimatedSecurityValue: yup.number().required(validationMsg.required),
  MaximumLtv: yup.number().required(validationMsg.required),
  LoanPeriod: yup.number().required(validationMsg.required),
  InterestType: yup.string().required(validationMsg.required),

  NetLoanAmount: yup
    .number()
    .when("CalculateMaxFromSecurity", (CalculateMaxFromSecurity, schema) =>
      CalculateMaxFromSecurity === false
        ? schema.required(validationMsg.required)
        : schema.nullable()
    ),

  Gdv: yup.number(),
  MaximumGdltv: yup.number(),
  BuildPeriod: yup.number(),
  FurtherDrawdownsAmount: yup.number(),

  InterestRate: yup.number().required(validationMsg.required),
  ArrangementFeeTotal: yup.number().required(validationMsg.required),
  ArrangementFeeBroker: yup.number().required(validationMsg.required),
  OtherFees: yup.number(),

  Notes: yup.string(),
  PropertyLocation: yup.string(),
  PropertyType: yup.string(),
});

export default enquiryValidationSchema;
