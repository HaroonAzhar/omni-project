import { useSelector } from "react-redux";
import { humanize } from "inflected";

import { currencyFormat, mapBooleanFieldToString, percentFormat } from "utils";

const prepareExistingFirstCharge = ({ charge = {} }, index) => {
  const formattedValue = currencyFormat(
    charge.current_mortgage_outstanding || 0
  );
  return `${index + 1}. ${formattedValue}`;
};

const prepareFirstChargeLender = ({ charge = {} }, index) => {
  if (!charge.lenders) return "";
  const lenderNames = charge.lenders.map(({ name }) => name);

  return `${index + 1}. ${lenderNames.join(", ")}`;
};

export default () => {
  const application = useSelector((state) => state.application);
  const { calculatorResponse = {} } = useSelector((state) => state.calculator);
  const { loan = {}, properties = [] } = application;

  const isServicedLoan = application.type_of_loan === "serviced";

  const securityType =
    application.securities &&
    application.securities[0] &&
    application.securities[0].security_type;

  return {
    isServicedLoan,
    securityType,
    type_of_loan: application.type_of_loan,
    serviced: mapBooleanFieldToString(isServicedLoan),
    term: application.loan_term,
    serviceDuration: "-",
    exitDate: calculatorResponse.repayment_date, // new Date
    day1NetRelease: currencyFormat(
      calculatorResponse.net_amount_of_first_advance
    ),
    arrangementFee: currencyFormat(calculatorResponse.arrangement_fee_in_value),
    lendersInsuranceCompletionFee: currencyFormat(
      calculatorResponse.total_fees
    ),
    advancedInterest: currencyFormat(calculatorResponse.advanced_interest),
    drawdowns: currencyFormat(application.further_draw_downs),
    totalFacility: currencyFormat(calculatorResponse.total_loan_facility || 0),
    totalInterest: currencyFormat(application.estimated_interest),
    interestRatePCM: percentFormat(application.interest_rate / 100),
    interestType: humanize(application.type_of_loan || ""),
    totalFees: "-",
    omniShare: currencyFormat(calculatorResponse.arrangement_fee_in_value),
    brokerShare: currencyFormat(
      calculatorResponse.intermediary_commission_fee_value
    ),
    existingFirstCharge: properties.map(prepareExistingFirstCharge),
    firstChargeLender: properties.map(prepareFirstChargeLender),
    servicing_method_rationale: loan.servicing_method_rationale,
  };
};
