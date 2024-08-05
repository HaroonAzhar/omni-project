import getDrawdowns from "./index";

describe("Getting drawdowns", () => {
  it("length of the drawdowns should be equal to build period plus 1", () => {
    const expectedLength = 3;
    const getBuildPeriod = () => expectedLength - 1;

    const returnedDrawdowns = getDrawdowns({
      getBuildPeriod,
    });

    expect(returnedDrawdowns.length).toBe(expectedLength);
  });

  it("length of drawdowns should be equal to calculator response length", () => {
    const expectedLength = 10;
    const getBuildPeriod = () => 3;

    const getCalculatorDrawdownsLength = () => expectedLength;

    const manualGeneratedDrawdowns = getDrawdowns({
      getBuildPeriod,
      getCalculatorDrawdownsLength,
    });

    expect(manualGeneratedDrawdowns.length).toBe(expectedLength);
  });

  it("first advance should be in the first drawdown period", () => {
    const firstAdvance = 1000;
    const getFirstAdvance = () => firstAdvance;
    const getBuildPeriod = () => 3;

    const returnedDrawdowns = getDrawdowns({
      getFirstAdvance,
      getBuildPeriod,
    });

    expect(returnedDrawdowns[0].advance).toBe(firstAdvance);
  });

  it("should use the drawdowns dates function", () => {
    const startDate = new Date(2020, 6, 7);
    const getStartDate = () => startDate;
    const getBuildPeriod = () => 3;

    const getDrawdownsDatesMock = jest.fn(() => []);

    getDrawdowns({
      getStartDate,
      getBuildPeriod,
      getDrawdownsDates: getDrawdownsDatesMock,
    });
    expect(getDrawdownsDatesMock).toHaveBeenCalledWith({
      getStartDate,
      getBuildPeriod,
    });
  });

  it("should use get advance function", () => {
    const getBuildPeriod = () => 3;
    const getExpectedTotalOfAdvances = () => 100;

    const getAdvancesMock = jest.fn(() => []);

    getDrawdowns({
      getExpectedTotalOfAdvances,
      getBuildPeriod,
      getAdvances: getAdvancesMock,
    });
    expect(getAdvancesMock).toHaveBeenCalledWith({
      getBuildPeriod,
      getExpectedTotalOfAdvances,
    });
  });

  it("should fill values with generated drawdowns values function", () => {
    const expectedDrawdownValue = 123;
    const getAdvances = () => [
      expectedDrawdownValue,
      expectedDrawdownValue,
      expectedDrawdownValue,
    ];

    const returnedAutomaticDrawdowns = getDrawdowns({
      getAdvances,
    });

    returnedAutomaticDrawdowns
      .splice(1)
      .forEach(({ advance: advanceOfReturnedDrawdown }) =>
        expect(advanceOfReturnedDrawdown).toBe(expectedDrawdownValue)
      );
  });

  it("first drawdown and drawdowns within build period should be shown", () => {
    const getBuildPeriod = () => 3;
    const getAutomaticDrawdownsAdvances = () => [1, 2, 3];
    const getCalculatorDrawdownsLength = () => 4;

    const returnedAutomaticDrawdowns = getDrawdowns({
      getBuildPeriod,
      getAutomaticDrawdownsAdvances,
      getCalculatorDrawdownsLength,
    });

    returnedAutomaticDrawdowns
      .slice(0, 4)
      .forEach(({ isShown }) => expect(isShown).toBe(true));
    returnedAutomaticDrawdowns
      .slice(4)
      .forEach(({ isShown }) => expect(isShown).toBe(false));
  });
});
