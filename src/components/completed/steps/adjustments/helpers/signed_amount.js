const signedAmount = (adjustment, amount) =>
  adjustment.BalanceEffect === "Reduce" ? -amount : amount;

export default signedAmount;
