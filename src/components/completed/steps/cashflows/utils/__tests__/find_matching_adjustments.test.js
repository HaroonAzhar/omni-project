import findMatchingAdjustments from "../find_matching_adjustments";

describe("findMatchingAdjustments", () => {
  it("Double adjustments at the same day", () => {
    const adjustments = [
      {
        ActualDate: "2021-02-15",
        signedAmount: 100,
      },
      {
        ActualDate: "2021-02-15",
        signedAmount: -100,
      },
      {
        ActualDate: "2021-02-14",
        signedAmount: -100,
      },
    ];

    const statementEntry = {
      balance_adjustments: [-100, 100],
      from: "2021-02-15",
    };

    const matchedAdjustments = findMatchingAdjustments({
      statementEntry,
      adjustments,
    });

    expect(matchedAdjustments).toEqual(adjustments.slice(0, 2).reverse());
  });

  it("Double adjustments at the same day with same amount are differentiated", () => {
    const adjustments = [
      {
        ActualDate: "2021-02-15",
        signedAmount: 100,
        Description: "bar",
      },
      {
        ActualDate: "2021-02-15",
        signedAmount: 100,
        Description: "foo",
      },
    ];

    const statementEntry = {
      balance_adjustments: [100, 100],
      from: "2021-02-15",
    };

    const matchedAdjustments = findMatchingAdjustments({
      statementEntry,
      adjustments,
    });

    expect(matchedAdjustments).toEqual(adjustments.slice(0, 2));
  });

  it("Filters out 0 amounts", () => {
    const adjustments = [
      {
        ActualDate: "2021-02-15",
        signedAmount: 0,
        Description: "bar",
      },
      {
        ActualDate: "2021-02-15",
        signedAmount: 100,
        Description: "foo",
      },
    ];

    const statementEntry = {
      balance_adjustments: [0],
      from: "2021-02-15",
    };

    const matchedAdjustments = findMatchingAdjustments({
      statementEntry,
      adjustments,
    });

    expect(matchedAdjustments).toEqual([]);
  });

  it("When no amount match returns default", () => {
    const adjustments = [
      {
        ActualDate: "2021-02-15",
        signedAmount: 0,
        Description: "bar",
      },
      {
        ActualDate: "2021-02-15",
        signedAmount: 100,
        Description: "foo",
      },
    ];

    const statementEntry = {
      balance_adjustments: [1],
      from: "2021-02-15",
    };

    const matchedAdjustments = findMatchingAdjustments({
      statementEntry,
      adjustments,
    });

    expect(matchedAdjustments).toEqual([
      { Description: "Initial loan amount", signedAmount: 1 },
    ]);
  });

  it("Can inject custom default", () => {
    const adjustments = [
      {
        ActualDate: "2021-02-15",
        signedAmount: 0,
        Description: "bar",
      },
      {
        ActualDate: "2021-02-15",
        signedAmount: 100,
        Description: "foo",
      },
    ];

    const statementEntry = {
      balance_adjustments: [1],
      from: "2021-02-15",
    };

    const customDefault = { Description: "Custom default" };
    const matchedAdjustments = findMatchingAdjustments({
      statementEntry,
      adjustments,
      getDefaultAdjustment: () => customDefault,
    });

    expect(matchedAdjustments).toEqual([customDefault]);
  });

  it("When no date match returns default", () => {
    const adjustments = [
      {
        ActualDate: "2021-02-15",
        signedAmount: 0,
        Description: "bar",
      },
      {
        ActualDate: "2021-02-15",
        signedAmount: 100,
        Description: "foo",
      },
    ];

    const statementEntry = {
      balance_adjustments: [100],
      from: "2021-02-14",
    };

    const matchedAdjustments = findMatchingAdjustments({
      statementEntry,
      adjustments,
    });

    expect(matchedAdjustments).toEqual([
      { Description: "Initial loan amount", signedAmount: 100 },
    ]);
  });
});
