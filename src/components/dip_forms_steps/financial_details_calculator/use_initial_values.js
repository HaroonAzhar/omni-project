import moment from "moment";
import { useSelector } from "react-redux";

import { getSumOfSecurityEstimations } from "./utils";
const todayDateString = moment(new Date()).format("YYYY-MM-DD");

export default (calculatorCache = {}) => {
  const dip = useSelector((store) => store.dip || {});
  const getValue = (name) => calculatorCache[name] || dip[name];

  const sumOfSecurityEstimations = getSumOfSecurityEstimations(dip.securities);

  return {
    InitialNetLoanAmount: getValue("InitialNetLoanAmount"),
    GrossAmountAtMaturity: getValue("GrossAmountAtMaturity"),
    ArrangementFee: getValue("ArrangementFee"),
    ArrangementFeePercent: getValue("ArrangementFeePercent"),
    ArrangementFeeRepayment: getValue("ArrangementFeeRepayment"),
    ExitFeeIntermediary: getValue("ExitFeeIntermediary"),
    InterestRate: getValue("InterestRate"),
    TitleInsuranceFee: getValue("TitleInsuranceFee"),
    IntermediaryCommissionFeeValue: getValue("IntermediaryCommissionFeeValue"),
    IntermediaryCommissionFeePercent: getValue(
      "IntermediaryCommissionFeePercent"
    ),
    MarketValue: sumOfSecurityEstimations || calculatorCache.MarketValue,
    PremiumForLendersInsurance: getValue("PremiumForLendersInsurance") || 250,
    CompletionAdministrationFee: getValue("CompletionAdministrationFee") || 400,
    StartingPoint: getValue("StartingPoint") || "market_value",
    ValueTypeOfIntermediaryFee:
      getValue("ValueTypeOfIntermediaryFee") || "percent",
    ValueTypeOfArrangementFee:
      getValue("ValueTypeOfArrangementFee") || "percent",
    StartDate:
      moment(getValue("StartDate")).format("YYYY-MM-DD") || todayDateString,
    furtherAdvances: getValue("furtherAdvances"),
    IsManualMode: getValue("IsManualMode"),
  };
};
