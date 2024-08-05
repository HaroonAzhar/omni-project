import getDrawdownsDates from "./index";

describe("Generating dates for drawdowns", () => {
  it("length of drawdowns dates should be equal to build period plus 1", () => {
    const expectedLength = 4;
    const getBuildPeriod = () => expectedLength - 1;
    const getStartDate = () => new Date();

    const drawdownsDates = getDrawdownsDates({
      getBuildPeriod,
      getStartDate,
    });

    expect(drawdownsDates.length).toBe(expectedLength);
  });

  it("length of drawdowns dates should be equal to length of calculator drawdowns if provided", () => {
    const expectedLength = 10;
    const getCalculatorDrawdownsLength = () => expectedLength;

    const drawdownsDates = getDrawdownsDates({
      getCalculatorDrawdownsLength,
    });

    expect(drawdownsDates.length).toBe(expectedLength);
  });

  it("first drawdown date should be equal to start date", () => {
    const startDate = new Date("2020-05-03");
    const getStartDate = () => startDate;
    const getBuildPeriod = () => 3;

    const drawdownsDates = getDrawdownsDates({
      getStartDate,
      getBuildPeriod,
    });
    expect(drawdownsDates[0]).toEqual("03/05/2020");
  });

  it("next date should be one month after the start date", () => {
    const startDate = new Date("2020-06-07");
    const expectedDate = "07/07/2020";
    const getStartDate = () => startDate;
    const getBuildPeriod = () => 3;

    const drawdownsDates = getDrawdownsDates({
      getStartDate,
      getBuildPeriod,
    });
    expect(drawdownsDates[1]).toEqual(expectedDate);
  });

  it("It should be last day of month if it does not fit the month length", () => {
    const startDate = new Date("2020-08-31");
    const expectedDate = "30/09/2020";
    const getStartDate = () => startDate;
    const getBuildPeriod = () => 3;

    const drawdownsDates = getDrawdownsDates({
      getStartDate,
      getBuildPeriod,
    });
    expect(drawdownsDates[1]).toEqual(expectedDate);
  });
  it("It should be last day of month if it does not fit the month length on leap years", () => {
    const startDate = new Date("2020-01-31");
    const expectedDate = "29/02/2020";
    const getStartDate = () => startDate;
    const getBuildPeriod = () => 3;

    const drawdownsDates = getDrawdownsDates({
      getStartDate,
      getBuildPeriod,
    });
    expect(drawdownsDates[1]).toEqual(expectedDate);
  });
});
