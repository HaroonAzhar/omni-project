const initialValue = {
  gross_value: 0,
  debt: 0,
  net_value: 0,
  monthly_mortgage: 0,
  monthly_rental: 0,
};

const sumFields = (acc, item) => {
  acc.gross_value += Number(item.gross_value) || 0;
  acc.debt += Number(item.debt) || 0;
  acc.net_value += Number(item.net_value) || 0;
  acc.monthly_mortgage += Number(item.monthly_mortgage) || 0;
  acc.monthly_rental += Number(item.monthly_rental) || 0;
};

export default (applicantsData) =>
  applicantsData.reduce(
    (acc, { tableData }) => {
      tableData.forEach((item) => {
        sumFields(acc.overallSubtotal, item);

        if (item.type === "property") {
          sumFields(acc.overallPropertySubtotal, item);
        } else {
          sumFields(acc.overallNonPropertySubtotal, item);
        }
      });

      return acc;
    },
    {
      overallPropertySubtotal: { ...initialValue },
      overallNonPropertySubtotal: { ...initialValue },
      overallSubtotal: { ...initialValue },
    }
  );
