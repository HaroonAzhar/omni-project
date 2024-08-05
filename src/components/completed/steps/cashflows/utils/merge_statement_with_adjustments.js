import moment from "moment";

import findMatchingAdjustments from "./find_matching_adjustments";

const mergeStatementWithAdjustments = ({
  adjustmentFormat,
  interestFormat,
  defaultGenerator,
}) => ({ adjustments, statementResults }) => {
  const statementsWithAdjustments = statementResults.filter(
    (statementEntry) => statementEntry.balance_adjustments
  );
  const adjustmentRows = statementsWithAdjustments.flatMap(
    (statementEntry, index) => {
      const matchingAdjustments = findMatchingAdjustments({
        statementEntry,
        adjustments,
        getDefaultAdjustment: defaultGenerator(index),
      }).filter(Boolean);

      return matchingAdjustments.map((matchingAdjustment) =>
        adjustmentFormat({ statementEntry, matchingAdjustment })
      );
    }
  );

  const interestRows = statementResults
    .filter(
      (statementEntry) =>
        statementEntry.interest && statementEntry.interest !== 0
    )
    .map((statementEntry) => interestFormat({ statementEntry }));
  const transactions = [...adjustmentRows, ...interestRows].sort(
    (rowA, rowB) => moment(rowA.Date) - moment(rowB.Date)
  );

  return transactions;
};

export default mergeStatementWithAdjustments;
