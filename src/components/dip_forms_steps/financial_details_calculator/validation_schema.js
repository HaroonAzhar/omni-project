import * as yup from "yup";

import { validationMsg } from "utils";

const setFieldValidationToRequiredNumber = (arr) => {
  return arr.reduce(
    (acc, key) => ({
      ...acc,
      [key]: yup.number().required(validationMsg.required),
    }),
    {}
  );
};

export default yup.object().shape({
  ...setFieldValidationToRequiredNumber([
    "InterestRate",
    "MarketValue",
    "PremiumForLendersInsurance",
    "CompletionAdministrationFee",
  ]),
  // intermediary_commission_fee: yup
  //   .number()
  //   .when("$IntroducerType", (IntroducerType, schema) =>
  //     IntroducerType === "via_broker"
  //       ? schema.required(validationMsg.required)
  //       : schema.nullable()
  //   ),
  StartingPoint: yup.string().required(validationMsg.required),
  ArrangementFeePercent: yup.string().when("ValueTypeOfArrangementFee", {
    is: "percent",
    then: yup.string().required(validationMsg.required),
    otherwise: yup.string(),
  }),
  ArrangementFee: yup.string().when("ValueTypeOfArrangementFee", {
    is: "value",
    then: yup.string().required(validationMsg.required),
    otherwise: yup.string(),
  }),
  TitleInsuranceFee: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value)),

  value_type_of_loan_amount: yup.string().when("StartingPoint", {
    is: "loan_amount",
    then: yup.string().required(validationMsg.required),
    otherwise: yup.string(),
  }),
  InitialNetLoanAmount: yup.number().when("StartingPoint", {
    is: "loan_amount",
    then: yup.number().required(validationMsg.required),
    otherwise: yup.number(),
  }),
  MarketValue: yup.number().when("StartingPoint", {
    is: "market_value",
    then: yup.number().required(validationMsg.required),
    otherwise: yup.number(),
  }),
});
