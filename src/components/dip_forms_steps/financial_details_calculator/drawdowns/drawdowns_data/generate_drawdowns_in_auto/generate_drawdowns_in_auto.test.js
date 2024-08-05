import generateDrawdownsInAuto from "./index";

describe("Auto generating drawdowns", () => {
  it("none drawdowns should be editable", () => {
    const getBuildPeriod = () => 3;
    const getAutomaticDrawdownsAdvances = () => [1, 2, 3];

    const returnedAutomaticDrawdowns = generateDrawdownsInAuto({
      getBuildPeriod,
      getAutomaticDrawdownsAdvances,
    });

    returnedAutomaticDrawdowns.forEach(({ isEditable }) =>
      expect(isEditable).not.toBe(true)
    );
  });
});
