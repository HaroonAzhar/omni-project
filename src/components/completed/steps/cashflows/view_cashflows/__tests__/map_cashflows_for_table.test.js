import mapCashflowsForTable from "../map_cashflows_for_table";
import e2eStatementResults from "../../utils/__tests__/data/statement_results";
import e2eAdjustments from "../../utils/__tests__/data/adjustments";

describe("mapCashflowsForTable", () => {
  it("Creates multiple entries for multiple adjustments", () => {
    const date = "2021-02-15";
    const statementResults = [
      {
        balance_adjustments: [100, -200],
        from: date,
        start_balance: 1000,
        interest: 50,
        to: "2021-02-16",
        end_balance: 950,
      },
    ];

    const adjustments = [
      {
        ActualDate: date,
        signedAmount: 100,
        Description: "bar",
      },
      {
        ActualDate: date,
        signedAmount: -200,
        Description: "foo",
        TransactionType: "transaction",
      },
    ];

    const expectedRows = [
      {
        Type: "Adjustment",
        Date: date,
        Amount: 100,
        Description: "bar",
        Balance: 1000,
      },
      {
        Type: "Adjustment",
        Date: date,
        Amount: -200,
        Description: "transaction - foo",
        Balance: 1000,
      },
      {
        Type: "Interest",
        Date: date,
        Description: " Interest 15/02/2021 - 16/02/2021",
        Balance: 950,
        Amount: 50,
      },
    ];

    const rows = mapCashflowsForTable({ statementResults, adjustments });

    expect(rows).toEqual(expectedRows);
  });

  it("Defaults to initial net loan amount, then exit fee", () => {
    const date = "2021-02-15";
    const end = "2021-02-16";

    const statementResults = [
      {
        balance_adjustments: [100],
        from: date,
        start_balance: 1000,
        interest: 50,
        to: end,
        end_balance: 1150,
      },
      {
        balance_adjustments: [100],
        from: end,
        start_balance: 1150,
        interest: 0,
        to: end,
        end_balance: 1250,
      },
    ];

    const adjustments = [];

    const expectedRows = [
      {
        Type: "Adjustment",
        Date: date,
        Amount: 100,
        Description: "Initial loan amount",
        Balance: 1000,
      },
      {
        Type: "Interest",
        Date: date,
        Description: " Interest 15/02/2021 - 16/02/2021",
        Balance: 1150,
        Amount: 50,
      },
      {
        Type: "Adjustment",
        Date: end,
        Amount: 100,
        Description: "Exit Fee",
        Balance: 1150,
      },
    ];

    const rows = mapCashflowsForTable({ statementResults, adjustments });

    expect(rows).toEqual(expectedRows);
  });

  it("e2e", () => {
    const actualRows = mapCashflowsForTable({
      statementResults: e2eStatementResults,
      adjustments: e2eAdjustments,
    });

    expect(actualRows).toMatchSnapshot();
  });
});
