import { dateFormat } from "utils";
import {
  getInterestDescription,
  mergeStatementWithAdjustments,
  adjustmentDescription,
} from "components/completed/steps/cashflows/utils";

const defaultAdjustment = (index) => (amount) => {
  if (index === 0) {
    return undefined;
  }
  if (amount > 0) {
    return {
      BalanceEffect: "Increase",
      Amount: amount,
    };
  } else {
    return {
      BalanceEffect: "Reduce",
      Amount: amount,
    };
  }
};

const adjustmentRowFormat = ({ statementEntry, matchingAdjustment }) => {
  const debitsCredits =
    matchingAdjustment.BalanceEffect === "Reduce"
      ? { Credits: matchingAdjustment.amount }
      : { Debits: matchingAdjustment.amount };
  return {
    Type: "Adjustment",
    Date: statementEntry.from,
    ...debitsCredits,
    Description: adjustmentDescription(matchingAdjustment),
    FormattedDate: dateFormat(statementEntry.from),
  };
};

const interestRowFormat = ({ statementEntry }) => {
  const debitsCredits =
    statementEntry.interest < 0
      ? { Credits: -statementEntry.interest }
      : { Debits: statementEntry.interest };
  return {
    Type: "Interest",
    Date: statementEntry.from,
    ...debitsCredits,
    Description: `${getInterestDescription(statementEntry)} Interest`,
    FormattedDate: `${dateFormat(statementEntry.from)} to ${dateFormat(
      statementEntry.to
    )}`,
  };
};

const representAsTransactions = mergeStatementWithAdjustments({
  adjustmentFormat: adjustmentRowFormat,
  interestFormat: interestRowFormat,
  defaultGenerator: defaultAdjustment,
});

export default representAsTransactions;
