import drawdownsData from "./index";

describe("Drawdowns data", () => {
  it("Integration test for automatic drawdowns", () => {
    const getBuildPeriod = () => 3;
    const getStartDate = () => new Date("2020-04-15");
    const getExpectedTotalOfAdvances = () => 1000;
    const getFirstAdvance = () => 500;

    const getLoanAdvanceType = () => "multiple";
    const getMode = () => "auto";

    const getExistingManualDrawdowns = () => [];
    const getCalculatorDrawdowns = () => {};

    const expectedDrawdowns = [
      {
        date: "15/04/2020",
        advance: 500,
        isShown: true,
      },
      {
        date: "15/05/2020",
        advance: 333.34,
        isShown: true,
      },
      {
        date: "15/06/2020",
        advance: 333.33,
        isShown: true,
      },
      {
        date: "15/07/2020",
        advance: 333.33,
        isShown: true,
      },
    ];

    const returnedAutomaticDrawdowns = drawdownsData({
      getLoanAdvanceType,
      getStartDate,
      getBuildPeriod,
      getExpectedTotalOfAdvances,
      getMode,
      getExistingManualDrawdowns,
      getCalculatorDrawdowns,
      getFirstAdvance,
    });

    expectedDrawdowns.forEach((expectedDrawdown, index) => {
      expect(returnedAutomaticDrawdowns[index].value).toBe(
        expectedDrawdown.value
      );
      expect(returnedAutomaticDrawdowns[index].date).toStrictEqual(
        expectedDrawdown.date
      );
    });
  });

  it("Integration test for manual drawdowns with calculator", () => {
    const getBuildPeriod = () => 3;
    const getStartDate = () => new Date("2020-04-15");
    const getExpectedTotalOfAdvances = () => 1000;
    const getFirstAdvance = () => 500;

    const getLoanAdvanceType = () => "multiple";
    const getMode = () => "auto";

    const getExistingManualDrawdowns = () => [100, null, 200];
    const getCalculatorDrawdowns = () => [
      {
        advance: 1000,
        interest: 10,
      },
      {
        advance: 1000,
        interest: 10,
      },
      {
        interest: 10,
      },
      {
        interest: 10,
      },
      {
        interest: 10,
      },
    ];

    const expectedDrawdowns = [
      {
        date: "15/04/2020",
        advance: 1000,
        isShown: true,
        interest: 10,
        isEditable: false,
      },
      {
        date: "15/05/2020",
        advance: 100,
        isShown: true,
        interest: 10,
        isEditable: true,
      },
      {
        date: "15/06/2020",
        advance: null,
        isShown: true,
        interest: 10,
        isEditable: true,
      },
      {
        date: "15/07/2020",
        advance: 200,
        isShown: true,
        interest: 10,
        isEditable: true,
      },
      {
        date: "15/08/2020",
        interest: 10,
      },
    ];

    const returnedAutomaticDrawdowns = drawdownsData({
      getLoanAdvanceType,
      getStartDate,
      getBuildPeriod,
      getExpectedTotalOfAdvances,
      getMode,
      getExistingManualDrawdowns,
      getCalculatorDrawdowns,
      getFirstAdvance,
    });

    expect(returnedAutomaticDrawdowns.length).toBe(expectedDrawdowns.length);

    expectedDrawdowns.forEach((expectedDrawdown, index) => {
      expect(returnedAutomaticDrawdowns[index].value).toBe(
        expectedDrawdown.value
      );
      expect(returnedAutomaticDrawdowns[index].date).toStrictEqual(
        expectedDrawdown.date
      );
    });
  });
});
