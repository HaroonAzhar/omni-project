import getAdvance from ".";

describe("getAdvance", () => {
  it("can handle none drawdowns", () => {
    const getFirstAdvance = () => 3;
    const drawdownAdvances = undefined;

    expect(getAdvance({ drawdownAdvances, getFirstAdvance, index: 0 })).toBe(3);
    expect(getAdvance({ drawdownAdvances, getFirstAdvance, index: 1 })).toBe(0);
    expect(getAdvance({ drawdownAdvances, getFirstAdvance, index: 1000 })).toBe(
      0
    );
  });
});
