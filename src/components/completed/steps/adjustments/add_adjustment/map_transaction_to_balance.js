import { getTransactions } from "./get_transactions";

const getMapping = () => {
  const transactions = getTransactions();
  return transactions.reduce(
    (acc, { value, effect, label }) => ({
      ...acc,
      [label]: { effect, rename: value },
    }),
    {}
  );
};
const mapping = getMapping();

const mapTransactionToBalance = (transactionType) => {
  const mapped = mapping[transactionType];
  return {
    BalanceEffect: mapped.effect,
    ...(mapped.rename ? { TransactionType: mapped.rename } : {}),
  };
};

export default mapTransactionToBalance;
