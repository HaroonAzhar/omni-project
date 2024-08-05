import representAsMonthlyInterestRate, {
  DEFAULT_INTEREST_RATE,
} from "../represent_as_monthly_interest_rate";

describe("representAsMonthlyInterestRate", () => {
  const baseInterestRate = 1.1;
  const baseCompleted = {
    DateOfCompletion: "2019-12-31T00:00:00Z",
    DateOfMaturity: "2020-12-30T00:00:00Z",
  };
  it("Without default events", () => {
    const completed = baseCompleted;
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: completed.DateOfMaturity,
        interestRate: application.interest_rate,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });

  it("Handles missing entires", () => {
    const completed = null;
    const application = null;

    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate.length).toBeDefined();
  });

  it("Single default event", () => {
    const completed = {
      ...baseCompleted,
      defaultEventsPeriods: [
        {
          start_from: "2020-06-05T00:00:00Z",
          to: "2020-08-05T00:00:00Z",
        },
      ],
    };
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: "2020-06-04T00:00:00Z",
        interestRate: application.interest_rate,
      },
      {
        start: "2020-06-05T00:00:00Z",
        end: "2020-08-04T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2020-08-05T00:00:00Z",
        end: completed.DateOfMaturity,
        interestRate: application.interest_rate,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });

  it("Two default events", () => {
    const completed = {
      ...baseCompleted,
      defaultEventsPeriods: [
        {
          start_from: "2020-06-05T00:00:00Z",
          to: "2020-08-05T00:00:00Z",
        },
        {
          start_from: "2020-10-05T00:00:00Z",
          to: "2020-11-20T00:00:00Z",
        },
      ],
    };
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: "2020-06-04T00:00:00Z",
        interestRate: application.interest_rate,
      },
      {
        start: "2020-06-05T00:00:00Z",
        end: "2020-08-04T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2020-08-05T00:00:00Z",
        end: "2020-10-04T00:00:00Z",
        interestRate: baseInterestRate,
      },
      {
        start: "2020-10-05T00:00:00Z",
        end: "2020-11-19T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2020-11-20T00:00:00Z",
        end: completed.DateOfMaturity,
        interestRate: application.interest_rate,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });

  it("Single Extension", () => {
    const extensionInterestRate = 2;
    const completed = {
      ...baseCompleted,
      extensions: [
        {
          FromDate: "2021-01-15T00:00:00Z",
          Date: "2021-03-25T00:00:00Z",
          InterestRate: extensionInterestRate,
        },
      ],
    };
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: completed.DateOfMaturity,
        interestRate: application.interest_rate,
      },
      {
        start: "2020-12-31T00:00:00Z",
        end: "2021-01-14T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2021-01-15T00:00:00Z",
        end: "2021-03-25T00:00:00Z",
        interestRate: extensionInterestRate,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });

  it("Extension starting from maturity", () => {
    const extensionInterestRate = 2;
    const completed = {
      ...baseCompleted,
      extensions: [
        {
          FromDate: "2020-12-31T00:00:00Z",
          Date: "2021-03-25T00:00:00Z",
          InterestRate: extensionInterestRate,
        },
      ],
    };
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: completed.DateOfMaturity,
        interestRate: application.interest_rate,
      },
      {
        start: "2020-12-31T00:00:00Z",
        end: "2021-03-25T00:00:00Z",
        interestRate: extensionInterestRate,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });

  it("Single default event at the end", () => {
    const completed = {
      ...baseCompleted,
      defaultEventsPeriods: [
        {
          start_from: "2020-06-05T00:00:00Z",
          to: "2020-12-31T00:00:00Z",
        },
      ],
    };
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: "2020-06-04T00:00:00Z",
        interestRate: application.interest_rate,
      },
      {
        start: "2020-06-05T00:00:00Z",
        end: "2020-12-30T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });

  it("Double extension", () => {
    const extensionInterestRate = 2;
    const completed = {
      ...baseCompleted,
      extensions: [
        {
          FromDate: "2020-12-31T00:00:00Z",
          Date: "2021-03-25T00:00:00Z",
          InterestRate: extensionInterestRate,
        },

        {
          FromDate: "2021-05-21T00:00:00Z",
          Date: "2021-08-25T00:00:00Z",
          InterestRate: extensionInterestRate,
        },
      ],
    };
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: completed.DateOfMaturity,
        interestRate: application.interest_rate,
      },
      {
        start: "2020-12-31T00:00:00Z",
        end: "2021-03-25T00:00:00Z",
        interestRate: extensionInterestRate,
      },
      {
        start: "2021-03-26T00:00:00Z",
        end: "2021-05-20T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2021-05-21T00:00:00Z",
        end: "2021-08-25T00:00:00Z",
        interestRate: extensionInterestRate,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });

  it("Double extension, double default", () => {
    const extensionInterestRate = 2;
    const completed = {
      ...baseCompleted,
      extensions: [
        {
          FromDate: "2020-12-31T00:00:00Z",
          Date: "2021-03-25T00:00:00Z",
          InterestRate: extensionInterestRate,
        },

        {
          FromDate: "2021-05-21T00:00:00Z",
          Date: "2021-08-25T00:00:00Z",
          InterestRate: extensionInterestRate,
        },
      ],
      defaultEventsPeriods: [
        {
          start_from: "2020-06-05T00:00:00Z",
          to: "2020-08-05T00:00:00Z",
        },
        {
          start_from: "2020-10-05T00:00:00Z",
          to: "2020-11-20T00:00:00Z",
        },
      ],
    };
    const application = {
      interest_rate: baseInterestRate,
    };

    const expectedMonthlyInterestRate = [
      {
        start: completed.DateOfCompletion,
        end: "2020-06-04T00:00:00Z",
        interestRate: application.interest_rate,
      },
      {
        start: "2020-06-05T00:00:00Z",
        end: "2020-08-04T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2020-08-05T00:00:00Z",
        end: "2020-10-04T00:00:00Z",
        interestRate: baseInterestRate,
      },
      {
        start: "2020-10-05T00:00:00Z",
        end: "2020-11-19T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2020-11-20T00:00:00Z",
        end: completed.DateOfMaturity,
        interestRate: application.interest_rate,
      },
      {
        start: "2020-12-31T00:00:00Z",
        end: "2021-03-25T00:00:00Z",
        interestRate: extensionInterestRate,
      },
      {
        start: "2021-03-26T00:00:00Z",
        end: "2021-05-20T00:00:00Z",
        interestRate: DEFAULT_INTEREST_RATE,
      },
      {
        start: "2021-05-21T00:00:00Z",
        end: "2021-08-25T00:00:00Z",
        interestRate: extensionInterestRate,
      },
    ];
    const monthlyInterestRate = representAsMonthlyInterestRate(application)(
      completed
    );

    expect(monthlyInterestRate).toEqual(expectedMonthlyInterestRate);
  });
});
