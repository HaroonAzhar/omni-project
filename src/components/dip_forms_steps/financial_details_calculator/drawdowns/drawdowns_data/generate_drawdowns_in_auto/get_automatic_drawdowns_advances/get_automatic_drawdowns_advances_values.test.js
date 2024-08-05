import getAutomaticDrawdownsAdvances from "./index";

describe("auto drawdowns advances", () => {
  it("should return empty array if build period is 0", () => {
    const getBuildPeriod = () => 0;
    const expectedAutoDrawdownsValues = [];

    const returnedAutoDrawdownsValues = getAutomaticDrawdownsAdvances({
      getBuildPeriod,
    });

    expect(returnedAutoDrawdownsValues).toStrictEqual(
      expectedAutoDrawdownsValues
    );
  });

  it("should return array of same values for simple case", () => {
    const buildPeriod = 10;
    const getBuildPeriod = () => buildPeriod;
    const getExpectedTotalOfAdvances = () => 200;
    const expectedSingleDrawdown = 20;

    const expectedAutoDrawdownsValues = Array(buildPeriod).fill(
      expectedSingleDrawdown
    );

    const returnedAutoDrawdownsValues = getAutomaticDrawdownsAdvances({
      getBuildPeriod,
      getExpectedTotalOfAdvances,
    });

    expect(returnedAutoDrawdownsValues).toStrictEqual(
      expectedAutoDrawdownsValues
    );
  });

  it("Round values to 2 decimal places and subtract overflow from the first drawdown", () => {
    const expectedTotalOfDrawdowns = 100;
    const buildPeriod = 32;
    const getBuildPeriod = () => buildPeriod;
    const getExpectedTotalOfAdvances = () => expectedTotalOfDrawdowns;
    const expectedSingleDrawdown = 3.13;

    const overflowDifference =
      expectedTotalOfDrawdowns - buildPeriod * expectedSingleDrawdown;
    const expectedFirstDrawdown = expectedSingleDrawdown + overflowDifference;

    const returnedAutoDrawdownsValues = getAutomaticDrawdownsAdvances({
      getBuildPeriod,
      getExpectedTotalOfAdvances,
    });

    expect(returnedAutoDrawdownsValues[0]).toBeCloseTo(
      expectedFirstDrawdown,
      2
    );

    returnedAutoDrawdownsValues
      .slice(1)
      .forEach((returnedAutoDrawdownValue) => {
        expect(returnedAutoDrawdownValue).toStrictEqual(expectedSingleDrawdown);
      });

    expect(
      returnedAutoDrawdownsValues.reduce((acc, value) => acc + value, 0)
    ).toBeCloseTo(expectedTotalOfDrawdowns, 2);
  });

  it("Round values to 2 decimal places and subtract overflow from the first drawdown for uneven cases", () => {
    const expectedTotalOfDrawdowns = 100;
    const buildPeriod = 3;
    const getBuildPeriod = () => buildPeriod;
    const getExpectedTotalOfAdvances = () => expectedTotalOfDrawdowns;
    const expectedSingleDrawdown = 33.33;

    const overflowDifference =
      expectedTotalOfDrawdowns - buildPeriod * expectedSingleDrawdown;
    const expectedFirstDrawdown = expectedSingleDrawdown + overflowDifference;

    const returnedAutoDrawdownsValues = getAutomaticDrawdownsAdvances({
      getBuildPeriod,
      getExpectedTotalOfAdvances,
    });

    expect(returnedAutoDrawdownsValues[0]).toBeCloseTo(
      expectedFirstDrawdown,
      2
    );

    returnedAutoDrawdownsValues
      .slice(1)
      .forEach((returnedAutoDrawdownValue) => {
        expect(returnedAutoDrawdownValue).toStrictEqual(expectedSingleDrawdown);
      });

    expect(
      returnedAutoDrawdownsValues.reduce((acc, value) => acc + value, 0)
    ).toBeCloseTo(expectedTotalOfDrawdowns, 2);
  });
});
