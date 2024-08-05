import { getTransactions } from "./get_transactions";

const getTransactionTypeOptions = () => {
  const transactions = getTransactions();
  const asObject = transactions.reduce((acc, transaction) => {
    if (acc[transaction.groupName] !== undefined) {
      acc[transaction.groupName].push(transaction.label);
    } else {
      acc[transaction.groupName] = [transaction.label];
    }
    return acc;
  }, {});
  return Object.entries(asObject).map(([group, options]) => ({
    group,
    options,
  }));
};

export default getTransactionTypeOptions;
