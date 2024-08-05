import { useSelector } from "react-redux";
import { humanize, titleize } from "inflected";

import { currencyFormat, percentFormat } from "utils";

import {
  DELEGATED,
  mergeSummaryData,
  getSummedValueFromSecurities,
  formatMonthsText,
} from "./helpers";

export const formatDataForTables = ({ dip, calculatorResponse }) => {
  const {
    type_of_loan,
    loan_term,
    premium_for_lenders_insurance,
    completion_administration_fee,
    arrangement_fee_repayment_date,
    exit_fee_intermediary,

    max_ltv,
    max_ltv_day_one,

    securities,
    build_period,
    further_draw_downs,
    loan_advance_type,
    interest_rate,
  } = dip;

  const max_ltv_value = (max_ltv ?? max_ltv_day_one) / 100;

  const {
    net_amount_of_first_advance,
    arrangement_fee_in_value,
    intermediary_commission_fee_value,
    xirr,
    gross_day_one_ltv,
    total_loan_facility,
    advanced_interest,
    gross_loan,
    gross_loan_first_advance,
    gdltv,
    gdltv_90_day,
    gross_amount_of_first_advance,
    exit_fee_value,
    gross_amount_at_maturity,
    total_interest,
    drawdowns,
    gross_amount_for_ltv,
    serviced_interest_total,
    arrangement_fee_retained_value,
    exit_fee_retained_value,
    total_loan_facility_excluding_interest,
  } = calculatorResponse;

  const getFormatedSecuritySum = (valueName) =>
    currencyFormat(getSummedValueFromSecurities(securities, valueName) || 0);

  if (!type_of_loan) return {};

  /*
    Base summary data contain all possible keys.
    When value is DELEGATED it means, that the data is used in a particular case.
    When value is defined, the key is used in all cases.
    This object is also used for define order of labels.
  */

  const market_value = getSummedValueFromSecurities(
    securities,
    "security_initial_estimation"
  );

  const drawdownsInterestTotal =
    drawdowns &&
    drawdowns.reduce((acc, drawdown) => acc + drawdown.interest, 0);

  const rolledUpTotalInterest =
    total_interest || drawdownsInterestTotal || advanced_interest;
  const rolledUpGrossFacilityInclInterest =
    gross_amount_at_maturity || total_loan_facility + rolledUpTotalInterest;

  const baseSummaryData = {
    "Interest Type": titleize(type_of_loan),
    Term: formatMonthsText(loan_term),
    "Drawdown Type": DELEGATED, // Rolled
    "Net Loan Amount (Day 1)": currencyFormat(net_amount_of_first_advance),
    "Arrangement Fee": {
      value: currencyFormat(arrangement_fee_in_value),
      "Arrangement Fee Retained": currencyFormat(
        arrangement_fee_retained_value ||
          arrangement_fee_in_value - intermediary_commission_fee_value
      ),
      "Arrangement Fee Broker": currencyFormat(
        intermediary_commission_fee_value
      ),
    },
    "Lender’s Insurance Fee": currencyFormat(premium_for_lenders_insurance),
    "Completion Administration Fee": currencyFormat(
      completion_administration_fee
    ),
    "Total Loan Facility": DELEGATED, // Serviced
    "Total Facility (Excl Interest)": DELEGATED, // Retained
    "Retained Interest": DELEGATED, // Retained
    "Total Facility (Inc Interest)": DELEGATED, // Retained
    "Total Amount of First Advance": DELEGATED, // Rolled
    "Estimated Interest (LTV Day 1)": DELEGATED, // Rolled
    "Gross Facility Amount (LTV Day 1)": DELEGATED, // Rolled
    "Subsequent Advances (i.e. drawdowns)": DELEGATED, // Rolled
    "Total Loan Facility (Excl Interest)": DELEGATED, // Rolled
    "Estimated Total Rolled up Interest": DELEGATED, // Rolled
    "Exit Fee": {
      value: currencyFormat(arrangement_fee_repayment_date || 0),
      "Exit Fee Retained": currencyFormat(
        exit_fee_retained_value ||
          arrangement_fee_repayment_date - exit_fee_intermediary ||
          arrangement_fee_repayment_date ||
          0
      ),
      "Exit Fee Broker": currencyFormat(exit_fee_intermediary || 0),
    },
    "Gross Facility": DELEGATED, // Serviced
    "Gross Facility (Incl Interest)": DELEGATED, // Retained and Rolled
    "Rate of Interest (Month)": percentFormat(interest_rate / 100),
    "Loan Type": humanize(securities && securities[0].security_type),
    "Serviced Interest (PCM)": DELEGATED, // Serviced
    "Serviced Interest (Total)": DELEGATED, // Serviced
    "Build Period": DELEGATED, // Rolled
    "Market Value": DELEGATED, // Serviced and Retained
    "Market Value 90 Day": getFormatedSecuritySum(
      "current_estimated90_day_market_value"
    ),
    "Market Value (Day 1)": DELEGATED, // Rolled
    "Market Value 90 Day (Day 1)": DELEGATED, // Rolled
    LTV: percentFormat(gross_day_one_ltv),
    "Max LTV": DELEGATED, // Serviced and Retained
    GDV: DELEGATED, // Rolled
    "GDV 90 Day": DELEGATED, // Rolled
    GDLTV: DELEGATED, // Rolled
    "GDLTV 90 Day": DELEGATED, // Rolled
    IRR: percentFormat(xirr),
  };

  const servicedSummaryData = {
    "Total Loan Facility": currencyFormat(total_loan_facility),
    "Gross Facility": currencyFormat(gross_loan),
    "Serviced Interest (PCM)": currencyFormat(advanced_interest),
    "Serviced Interest (Total)": currencyFormat(
      serviced_interest_total || advanced_interest * loan_term
    ),
    "Market Value": currencyFormat(market_value), // Serviced and Retained
    "Max LTV": percentFormat(max_ltv_value), // Serviced and Retained
  };

  const retainedSummaryData = {
    "Total Facility (Excl Interest)": currencyFormat(
      total_loan_facility_excluding_interest ||
        total_loan_facility - advanced_interest
    ),
    "Retained Interest": currencyFormat(advanced_interest),
    "Total Facility (Inc Interest)": currencyFormat(total_loan_facility),
    "Gross Facility (Incl Interest)": currencyFormat(gross_loan), // Retained and Rolled
    "Market Value": currencyFormat(market_value), // Serviced and Retained
    "Max LTV": percentFormat(max_ltv_value), // Serviced and Retained
  };

  const rolledSummaryData = {
    "Drawdown Type": humanize(loan_advance_type),
    "Total Amount of First Advance": currencyFormat(gross_loan_first_advance),
    "Estimated Interest (LTV Day 1)": currencyFormat(advanced_interest),
    "Gross Facility Amount (LTV Day 1)": currencyFormat(
      gross_amount_for_ltv ||
        gross_amount_of_first_advance + advanced_interest + exit_fee_value
    ),
    "Subsequent Advances (i.e. drawdowns)": currencyFormat(further_draw_downs),
    "Total Loan Facility (Excl Interest)": currencyFormat(total_loan_facility),
    "Estimated Total Rolled up Interest": currencyFormat(rolledUpTotalInterest),
    "Gross Facility (Incl Interest)": currencyFormat(
      rolledUpGrossFacilityInclInterest
    ), // Retained and Rolled
    "Build Period": formatMonthsText(build_period),
    "Market Value (Day 1)": currencyFormat(market_value),
    "Market Value 90 Day (Day 1)": getFormatedSecuritySum(
      "current_estimated90_day_market_value"
    ),
    GDV: getFormatedSecuritySum("gdv"),
    "GDV 90 Day": getFormatedSecuritySum("estimated90_day_gdv"),
    GDLTV: percentFormat(gdltv),
    "GDLTV 90 Day": percentFormat(gdltv_90_day),
  };

  const summaryData = {
    serviced: servicedSummaryData,
    retained: retainedSummaryData,
    rolled_up: rolledSummaryData,
  };

  return mergeSummaryData(baseSummaryData, summaryData[type_of_loan]);
};
export default (store = "dip") => {
  const dip = useSelector((state) => state[store]);
  const { calculatorResponse = {} } = useSelector((state) => state.calculator);

  return formatDataForTables({ dip, calculatorResponse });
};
