import { currencyFormat } from "utils";

import asEntry from "./as_entry";
import representAsTransactions from "./helpers/represent_as_transactions";

function addAdditionalTransactionsReplacements({
  data: { calculator, adjustments, statementResults = [], application },
  lists: { replacementList, removeList, cloneList },
}) {
  const {
    gross_loan_first_advance,
    exit_fee_value = 0,
  } = calculator.calculatorResponse;

  const transactions = representAsTransactions({
    adjustments,
    statementResults,
  });

  if (application.type_of_loan !== "retained") {
    removeList.push({
      options: {
        needle: "detailsOfInitialLoanGrantedAdvanceInterest",
        element: "table-row",
      },
    });
  } else {
    transactions.splice(0, 1);
  }
  replacementList.push(
    asEntry("detailsOfInitialLoanGrantedAdvanceInterest", "")
  );

  switch (transactions.length) {
    case 0:
      removeList.push({
        options: {
          needle: "additionalTransactionRow",
          element: "table-row",
        },
      });
      break;
    case 1:
      break;
    default:
      cloneList.push({
        options: {
          needle: "additionalTransactionRow",
          element: "table-row",
          repeat: transactions.length - 1,
        },
      });
      break;
  }
  replacementList.push(
    asEntry(
      "additionalTransactionDate",
      transactions.map((transaction) => transaction.FormattedDate)
    )
  );
  replacementList.push(
    asEntry(
      "additionalTransactionDescription",
      transactions.map((transaction) => transaction.Description ?? "")
    )
  );
  replacementList.push(
    asEntry(
      "additionalTransactionDebits",
      transactions.map((transaction) => currencyFormat(transaction.Debits, ""))
    )
  );
  replacementList.push(
    asEntry(
      "additionalTransactionCredits",
      transactions.map((transaction) => currencyFormat(transaction.Credits, ""))
    )
  );
  replacementList.push(asEntry("additionalTransactionRow", ""));

  const totalTransactionDebits = transactions.reduce(
    (acc, transaction) => acc + (transaction.Debits ?? 0),
    0
  );
  replacementList.push(
    asEntry(
      "additionalTransactionTotalDebits",
      currencyFormat(totalTransactionDebits)
    )
  );
  const totalTransactionCredits = transactions.reduce(
    (acc, transaction) => acc + (transaction.Credits ?? 0),
    0
  );
  replacementList.push(
    asEntry(
      "additionalTransactionTotalCredits",
      currencyFormat(totalTransactionCredits)
    )
  );

  const totalTransactions = totalTransactionDebits - totalTransactionCredits;
  replacementList.push(
    asEntry("additionalTransactions", currencyFormat(totalTransactions))
  );
  const bankCharge = 35;
  const totalAmountDueOnRedemption =
    bankCharge + gross_loan_first_advance + exit_fee_value + totalTransactions;

  replacementList.push(asEntry("bankCharge", currencyFormat(bankCharge)));
  replacementList.push(
    asEntry(
      "totalAmountDueOnRedemption",
      currencyFormat(totalAmountDueOnRedemption)
    )
  );
}

export default addAdditionalTransactionsReplacements;
