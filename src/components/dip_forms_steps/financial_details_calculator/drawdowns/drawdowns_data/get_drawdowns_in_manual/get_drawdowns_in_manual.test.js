import getDrawdownsInManual from "./index";

describe("Getting manual drawdowns", () => {
  it("drawdowns except from the first should be editable", () => {
    const getBuildPeriod = () => 3;
    const getExistingManualAdvances = () => [1, 2, 3];

    const returnedManualDrawdowns = getDrawdownsInManual({
      getBuildPeriod,
      getExistingManualAdvances,
    });

    const [firstDrawdwon, ...restDrawdowns] = returnedManualDrawdowns;
    expect(firstDrawdwon.isEditable).not.toBe(true);
    restDrawdowns.forEach(({ isEditable }) => expect(isEditable).toBe(true));
  });
});
