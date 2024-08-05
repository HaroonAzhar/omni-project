import moment from "moment";

import { dateFormat, percentFormat } from "utils";

import asEntry from "./as_entry";
import { representAsMonthlyInterestRate } from "./helpers";

const readableDateFormat = (date) => date.format("D MMMM YYYY");
function addCompletedReplacements({
  data: { completed, application },
  lists: { replacementList, cloneList },
}) {
  const completionDate = moment(completed?.DateOfCompletion ?? "2021-01-01");
  const redemptionDueDate = moment(
    completed?.currentDateOfMaturity ?? "2021-01-01"
  );

  const extendedDueDateLabel =
    (completed?.DateOfMaturity ?? "2021-01-01") ===
    (completed?.currentDateOfMaturity ?? "2021-01-01")
      ? ""
      : "Extended ";
  replacementList.push(asEntry("extendedDueDateLabel", extendedDueDateLabel));

  const periods = representAsMonthlyInterestRate(application)(completed);
  if (periods.length > 1) {
    cloneList.push({
      options: {
        needle: "monthlyInterestRateRow",
        element: "table-row",
        repeat: periods.length - 1,
      },
    });
  }
  replacementList.push(
    asEntry(
      "monthlyInterestRateStart",
      periods.map(({ start }) => dateFormat(start))
    )
  );
  replacementList.push(
    asEntry(
      "monthlyInterestRateEnd",
      periods.map(({ end }) => dateFormat(end))
    )
  );
  replacementList.push(
    asEntry(
      "monthlyInterestRateInterestRate",
      periods.map(({ interestRate }) => percentFormat(interestRate / 100))
    )
  );

  replacementList.push(asEntry("monthlyInterestRateRow", ""));

  replacementList.push(
    asEntry("completionDate", readableDateFormat(completionDate))
  );
  replacementList.push(
    asEntry("redemptionDueDate", readableDateFormat(redemptionDueDate))
  );
  replacementList.push(
    asEntry(
      "initialDate",
      dateFormat(completed?.DateOfCompletion ?? "2021-01-01")
    )
  );
  replacementList.push(asEntry("currentDate", dateFormat(Date.now())));

  const reportDate = moment(completed?.reportDate ?? "2021-01-01");

  replacementList.push(
    asEntry("statementDate", readableDateFormat(reportDate))
  );
  replacementList.push(
    asEntry(
      "afterRedemptionDueDate",
      dateFormat(redemptionDueDate.add(1, "day"))
    )
  );
}

export default addCompletedReplacements;
