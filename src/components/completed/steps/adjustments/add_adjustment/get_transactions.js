const REDUCE = "Reduce";
const INCREASE = "Increase";

const groups = [
  {
    groupName: "Redemptions/Payments",
    effect: REDUCE,
  },
  {
    groupName: "Adjustments",
    effect: REDUCE,
  },
  {
    groupName: "Fees",
    effect: INCREASE,
  },
  {
    groupName: "Drawdown/Further Advance",
    effect: INCREASE,
  },
];

const getGroups = () => groups;

const withGroup = (group) => (transaction) => ({
  value: transaction,
  ...group,
});
const redemptionTransactions = [
  "Early Redemption",
  "Partial Redemption",
  "Redemption",
  "Service Interest Payment",
].map(withGroup(groups[0]));

const feesTransactions = [
  "Administration Fee",
  "Asset Manager",
  "Enquiry Fee",
  "In House Fees",
  "Insurance",
  "Invoice Fee",
  "Legal Fees",
  "Litigation",
  "Receiver Fees",
  "Risk Report Fee",
  "Statement",
  "TT Charge (Bank Charges)",
  "Valuation Fee",
].map(withGroup(groups[2]));

const drawdownsTransactions = [
  "Balance Transfer",
  "Drawdown",
  "Further Advance",
  "Net Advance",
].map(withGroup(groups[3]));

const adjustmentsTransactions = [
  {
    value: "Ad-Hoc Cost",
    ...groups[1],
    effect: INCREASE,
  },
  {
    value: "Ad-Hoc Balance Reduction",
    ...groups[1],
  },
  {
    value: "Interest Rebate (Manual)",
    ...groups[1],
  },
  {
    label: "Import Adjustment - Balance Reduction",
    value: "Import Adjustment",
    ...groups[1],
  },
  {
    label: "Import Adjustment - Balance Increase",
    value: "Import Adjustment",
    ...groups[1],
    effect: INCREASE,
  },
  {
    value: "Write Off",
    ...groups[1],
  },
];

const transactions = [
  ...redemptionTransactions,
  ...adjustmentsTransactions,
  ...feesTransactions,
  ...drawdownsTransactions,
];

const getTransactions = () =>
  transactions.map((transaction) => ({
    label: transaction.value,
    ...transaction,
  }));

export { getGroups, getTransactions };
