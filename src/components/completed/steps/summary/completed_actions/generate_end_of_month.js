import { endOfMonth, getCase, getCases } from "utils/requests";
import { downloadResult } from "utils";

import getStatementInput from "../../cashflows/view_cashflows/get_statement_input";

const expectedCashflow = ({ completed }) => {
  return (
    completed?.cashflows?.reduce(
      (prev, provision) => provision.Amount,
      Number.MAX_VALUE
    ) ?? Number.MAX_VALUE
  );
};
const generateEndOfMonth = async (
  _id,
  reportPeriodStart,
  reportPeriodEnd,
  lastGenerationTime,
  effectiveGenerationTime
) => {
  const { data: cases } = await getCases();

  const endOfMonthCases = cases
    .filter((loan) => loan.CaseNr)
    .filter((loan) => loan.Stage === "completed" || loan.Stage === "redeemed");
  const loansData = await Promise.all(
    endOfMonthCases.map((loan) => getCase(loan.Id))
  );

  const loans = loansData
    .map(({ data }) => data)
    .map((loan) => ({
      ...getStatementInput({
        ...loan,
        endDate: loan.completed?.currentDateOfMaturity,
        ...loan.completed,
      }),
      additional_params: {
        securities: loan.completed?.securities ?? [],
        stage: loan.Stage,
        expected_cashflow: expectedCashflow(loan),
      },
    }));
  const response = await endOfMonth({
    loans,
    reportPeriodStart,
    reportPeriodEnd,
    lastGenerationTime,
    effectiveGenerationTime,
  });
  downloadResult(response, "end_of_month.xlsx");
};

export default generateEndOfMonth;
