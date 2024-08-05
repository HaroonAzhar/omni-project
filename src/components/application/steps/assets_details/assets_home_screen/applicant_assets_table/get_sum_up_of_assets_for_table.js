import getSumOfAssets from "./assets_sum_up/get_sum_of_assets";

export default (applicantsData) => {
  const {
    overallPropertySubtotal,
    overallNonPropertySubtotal,
    overallSubtotal,
  } = getSumOfAssets(applicantsData);

  const tableData = [
    {
      type: "Overall Property Subtotal",
      ...overallPropertySubtotal,
    },
    {
      type: "Overall Non Property Subtotal",
      ...overallNonPropertySubtotal,
    },
    {
      type: "Overall Subtotal",
      ...overallSubtotal,
    },
  ];

  return tableData;
};
