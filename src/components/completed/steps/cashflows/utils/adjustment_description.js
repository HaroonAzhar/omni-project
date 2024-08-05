const adjustmentDescription = (matchingAdjustment) =>
  [matchingAdjustment?.TransactionType, matchingAdjustment?.Description]
    .filter(Boolean)
    .join(" - ");

export default adjustmentDescription;
