const getStatementEntriesWithAdjustments = (statementEntries) =>
  statementEntries.filter(
    (statementEntry) => statementEntry.balance_adjustments
  );

export default getStatementEntriesWithAdjustments;
