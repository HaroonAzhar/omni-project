import { dateFormat } from "utils";

import {
  getInterestDescription,
  mergeStatementWithAdjustments,
  adjustmentDescription,
} from "../utils";

const defaultAdjustment = (index) => (amount) =>
  index === 0
    ? {
        signedAmount: amount,
        Description: "Initial loan amount",
      }
    : {
        signedAmount: amount,
        Description: "Exit Fee",
      };

const adjustmentRowFormat = ({ statementEntry, matchingAdjustment }) => {
  return {
    Type: "Adjustment",
    Date: statementEntry.from,
    Amount: matchingAdjustment.signedAmount,
    Description: adjustmentDescription(matchingAdjustment),
    Balance: statementEntry.start_balance,
  };
};

const interestRowFormat = ({ statementEntry }) => {
  return {
    Type: "Interest",
    Date: statementEntry.from,
    Amount: statementEntry.interest,
    Description: `${getInterestDescription(
      statementEntry
    )} Interest ${dateFormat(statementEntry.from)} - ${dateFormat(
      statementEntry.to
    )}`,
    Balance: statementEntry.end_balance,
  };
};

const mapCashflowsForTable = mergeStatementWithAdjustments({
  adjustmentFormat: adjustmentRowFormat,
  interestFormat: interestRowFormat,
  defaultGenerator: defaultAdjustment,
});

export default mapCashflowsForTable;
