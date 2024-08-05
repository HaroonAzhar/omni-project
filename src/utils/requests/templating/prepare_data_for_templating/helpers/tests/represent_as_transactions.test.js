import statementResults from "components/completed/steps/cashflows/utils/__tests__/data/statement_results";
import adjustments from "components/completed/steps/cashflows/utils/__tests__/data/adjustments";

import representAsTransactions from "../represent_as_transactions";

describe("representAsTransactions", () => {
  it("e2e test", () => {
    const actualTransactions = representAsTransactions({
      adjustments,
      statementResults,
    });

    expect(actualTransactions).toMatchSnapshot();
  });
});
