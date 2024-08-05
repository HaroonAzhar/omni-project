import moment from "moment";

const addPeriod = (periods, start, end, interestRate) => {
  if (start.isBefore(end)) {
    periods.push({
      start,
      end,
      interestRate,
    });
  }
};
const generateResults = (starts, periodStart, periodEnd) =>
  starts.reduce(
    ({ periods, prev }, current) => {
      if (prev !== null) {
        const start = periodStart(prev);
        const end = periodEnd(current);
        addPeriod(periods, start, end, prev.interestRate);
      }
      return {
        periods,
        prev: current,
      };
    },
    { periods: [], prev: null }
  );

export const DEFAULT_INTEREST_RATE = 3;

const representAsMonthlyInterestRate = (application) => (completed) => {
  const baseStart = moment.utc(completed?.DateOfCompletion ?? "2021-01-01");
  const baseEnd = moment.utc(completed?.DateOfMaturity ?? "2021-01-01");
  const baseInterestRate = application?.interest_rate;

  const starts = [{ start: baseStart, interestRate: baseInterestRate }];
  for (const defaultEventPeriod of completed?.defaultEventsPeriods ?? []) {
    starts.push({
      start: moment.utc(defaultEventPeriod.start_from),
      interestRate: DEFAULT_INTEREST_RATE,
    });
    starts.push({
      start: moment.utc(defaultEventPeriod.to),
      interestRate: baseInterestRate,
    });
  }

  const { periods: defaultResults, prev: last } = generateResults(
    starts,
    ({ start }) => start,
    ({ start }) => moment.utc(start.format()).subtract(1, "day")
  );

  addPeriod(defaultResults, last.start, baseEnd, last.interestRate);

  const extensionsStarts = [
    {
      start: baseEnd,
      interestRate: DEFAULT_INTEREST_RATE,
    },
  ];
  for (const extension of completed?.extensions ?? []) {
    extensionsStarts.push({
      start: moment.utc(extension.FromDate).subtract(1, "day"),
      interestRate: extension.InterestRate,
    });
    extensionsStarts.push({
      start: moment.utc(extension.Date),
      interestRate: DEFAULT_INTEREST_RATE,
    });
  }
  const { periods: extensionPeriods } = generateResults(
    extensionsStarts,
    ({ start }) => moment.utc(start.format()).add(1, "day"),
    ({ start }) => start
  );

  return [...defaultResults, ...extensionPeriods].map(
    ({ start, end, interestRate }) => ({
      interestRate,
      start: start.format(),
      end: end.format(),
    })
  );
};

export default representAsMonthlyInterestRate;
