const mapSingleCashflow = (cashflow) => ({
  ...cashflow,
});

const mapCashflowsForTable = (cashflowsData) => {
  return cashflowsData.map(mapSingleCashflow);
};

export default mapCashflowsForTable;
