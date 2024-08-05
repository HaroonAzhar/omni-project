import {
  getSumOfSecuritiesGDV,
  getSumOfMortgage,
  getSumOfSecurities90DayGDV,
  getSumOfSecurityEstimations,
} from "./utils";

const inputNamesOfValueTypeOf = {
  arrangement_fee: "ValueTypeOfArrangementFee",
  intermediary_commission_fee: "ValueTypeOfIntermediaryFee",
};

const percentOrValue = (values, key, percentValue, flatValue) => {
  const valueType = values[inputNamesOfValueTypeOf[key]];

  if (valueType === "percent") {
    return {
      [`${key}_percent`]: percentValue,
    };
  }
  return {
    [`${key}_value`]: flatValue,
  };
};
export default ({ values, drawdowns, dip }) => {
  const {
    LoanTerm,
    FurtherDrawDowns,
    BuildPeriodMonths,
    MaxLtvDayOne,
    LtvToGdv,
    LoanType,
    securities,
  } = dip;

  const {
    ArrangementFeeRepayment,
    CompletionAdministrationFee,
    ExitFeeIntermediary,
    InterestRate,
    MarketValue,
    PremiumForLendersInsurance,
    TitleInsuranceFee,
    IntermediaryCommissionFeePercent,
    IntermediaryCommissionFeeValue,
    ArrangementFee,
    ArrangementFeePercent,
  } = values || dip;

  // TASK: https://trello.com/c/d6RJ1ff4/2062-bug-dip-summary-if-you-go-to-view-summary-and-other-sections-were-updated-after-financial-details-then-the-wrong-information-wil
  // Data from here are incorrect (e.g. market-value) because
  // this value base on another inputs in the early steps in the DIP flow.
  // So it can be updated only when we open calculator step.

  // TODO: The optimal solution for that is to get initial calculator values
  // and use them for displaying a data in the result table.
  // Although in this case there is a problem that we don't have a updated data in the database.
  // To prevent this we need to save data that we get from getInitialData,
  // run calculator request and save these all data in the database.
  // In different words: We need to simulate calculator step in the summary step.

  const sumOfSecuritiesValues = getSumOfSecurityEstimations(securities);
  const sumOfSecuritiesGDV = getSumOfSecuritiesGDV(securities);
  const sumOfMortgages = getSumOfMortgage(securities);
  const sumOfSecurities90DayGDV = getSumOfSecurities90DayGDV(securities);

  return {
    ...percentOrValue(
      values || dip,
      "arrangement_fee",
      +ArrangementFeePercent,
      +ArrangementFee
    ),
    ...percentOrValue(
      values || dip,
      "intermediary_commission_fee",
      +IntermediaryCommissionFeePercent,
      +IntermediaryCommissionFeeValue
    ),

    exit_fee_value: +ArrangementFeeRepayment,
    exit_fee_intermediary: +ExitFeeIntermediary,
    monthly_interest_rate: +InterestRate / 100,
    title_insurance_fee: +TitleInsuranceFee,
    completion_administration_fee: +CompletionAdministrationFee,
    lenders_insurance_fee: +PremiumForLendersInsurance,
    further_advances: +FurtherDrawDowns,
    max_gross_ltv: +MaxLtvDayOne / 100,
    max_gdltv: +LtvToGdv / 100,
    build_period: +BuildPeriodMonths,

    initial_term: +LoanTerm,
    total_valuations: +sumOfSecuritiesValues || +MarketValue,
    gdv: +sumOfSecuritiesGDV || +MarketValue,
    type: LoanType,

    total_first_charge_outstanding: +sumOfMortgages,
    broker_fee_in: 0.015,
    broker_fee_out: 0.015,
    drawdowns,
    estimated_90_day_gdv: sumOfSecurities90DayGDV,
  };
};
