import drawdownsData from "./index";

describe("Drawdowns source selection", () => {
  it("when type of loan is single do not return any drawdowns", () => {
    const getLoanAdvanceType = () => "single";
    const getStartDate = () => new Date();
    const expectedDrawdownsData = undefined;

    const returnedDrawdownsData = drawdownsData({
      getLoanAdvanceType,
      getStartDate,
    });

    expect(returnedDrawdownsData).toBe(expectedDrawdownsData);
  });

  it("when in auto mode should use auto generate method", () => {
    const getLoanAdvanceType = () => "multiple";
    const getStartDate = () => new Date();
    const getMode = () => "auto";
    const generateDrawdownsInAutoMock = jest.fn(() => {});

    drawdownsData({
      getLoanAdvanceType,
      getStartDate,
      getMode,
      generateDrawdownsInAuto: generateDrawdownsInAutoMock,
    });

    expect(generateDrawdownsInAutoMock).toBeCalled();
  });

  it("when in manual mode should use get DrawdownMethod", () => {
    const getLoanAdvanceType = () => "multiple";
    const getStartDate = () => new Date();
    const getMode = () => "manual";
    const getDrawdownsInManual = jest.fn(() => {});

    drawdownsData({
      getLoanAdvanceType,
      getStartDate,
      getMode,
      getDrawdownsInManual,
    });

    expect(getDrawdownsInManual).toBeCalled();
  });

  it("finally it should combine drawdowns with calculator", () => {
    const getLoanAdvanceType = () => "multiple";
    const getStartDate = () => new Date();
    const getMode = () => "manual";
    const drawdowns = ["foo", "bar"];
    const getDrawdownsInManual = () => drawdowns;
    const getCalculatorDrawdowns = () => {};

    const combineDrawdownsWithCalculatorDrawdowns = jest.fn(() => {});
    drawdownsData({
      getLoanAdvanceType,
      getStartDate,
      getMode,
      getDrawdownsInManual,
      combineDrawdownsWithCalculatorDrawdowns,
      getCalculatorDrawdowns,
    });

    expect(combineDrawdownsWithCalculatorDrawdowns).toBeCalledWith({
      drawdowns,
      getCalculatorDrawdowns,
    });
  });

  it("when start date is missing do not return any drawdowns", () => {
    const getLoanAdvanceType = () => "multiple";
    const getMode = () => "manual";
    const getManualDrawdowns = jest.fn(() => {});
    const generateDrawdownsInAutoMock = jest.fn(() => {});
    const getStartDate = () => null;

    drawdownsData({
      getLoanAdvanceType,
      getMode,
      getManualDrawdowns,
      generateDrawdownsInAuto: generateDrawdownsInAutoMock,
      getStartDate,
    });

    expect(getManualDrawdowns).toHaveBeenCalledTimes(0);
    expect(generateDrawdownsInAutoMock).toHaveBeenCalledTimes(0);
  });
});
