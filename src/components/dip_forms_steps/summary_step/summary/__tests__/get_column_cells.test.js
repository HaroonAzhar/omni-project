import getColumnCells from "../get_column_cells";

const input = {
  "Interest Type": "Rolled Up",
  Term: 2,
  "Drawdown Type": "Multiple",
  "Net Loan Amount (Day 1)": "-£552.20",
  "Arrangement Fee": { value: "£1.20", "Arrangement Fee Retained": "£NaN" },
  "Lender’s Insurance Fee": "£250.00",
  "Total Amount of First Advance": 100,
  "Estimated Interest (LTV Day 1)": "£2.01",
  "Gross Facility Amount (LTV Day 1)": "£103.01",
  "Subsequent Advances (i.e. drawdowns)": "£21.00",
  "Total Loan Facility (Excl Interest)": "£121.00",
  "Estimated Total Rolled up Interest": "£2.01",
  "Exit Fee": { value: "£1.00", "Exit Fee Retained": "£NaN" },
  "Gross Facility (Incl Interest)": "£123.01",
  "Rate of Interest (Month)": "1.00%",
  "Loan Type": "Land",
  "Build Period": 1,
  "Market Value 90 Day": "£333.00",
  "Market Value (Day 1)": "£16,000.00",
  "Market Value 90 Day (Day 1)": "£333.00",
  LTV: "0.65%",
  "GDV 90 Day": "£444.00",
  GDVLTV: "£0.10",
  IRR: "27.40%",
};

describe("getColumnCells", () => {
  it("Match snapshot", () => {
    const output = getColumnCells(input);

    expect(JSON.stringify(output)).toMatchSnapshot();
  });
});
