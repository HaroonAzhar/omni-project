const categories = [
  "Completion Date",
  "Waypoint",
  "Send Standing Order Instruction",
  "Serviced Interest Payment Due",
  "Redemption Due Date",
  "Redeemed",
  "Pay Broker",
  "Letter Sent",
  "Post Completion Checks Completed",
  "Write Off Authorised",
  "Loan Imported",
];

const asOption = (category) => ({ label: category, value: category });

const getWaypointsCategories = () => [
  { label: "Choose one", value: "" },
  ...categories.map(asOption),
];

export default getWaypointsCategories;
