import combineDrawdownsWithCalculatorDrawdowns from "./index";

describe("combine drawdowns with calculator drawdowns", () => {
  const drawdownsAdvance = "200";
  const drawdownsDate = "03/05/2020";
  const drawdownsLength = 3;

  const drawdowns = Array(drawdownsLength).fill({
    advance: drawdownsAdvance,
    date: drawdownsDate,
  });

  it("should return provided drawdowns if calculator response drawdowns is missing", () => {
    const missingCalculatorDrawdons = () => undefined;
    const combinedDrawdowns = combineDrawdownsWithCalculatorDrawdowns({
      drawdowns,
      getCalculatorDrawdowns: missingCalculatorDrawdons,
    });

    expect(combinedDrawdowns).toBe(drawdowns);
  });

  it("should return provided drawdowns if calculator response drawdowns is empty", () => {
    const emptyCalculatorDrawdowns = () => [];
    const combinedDrawdowns = combineDrawdownsWithCalculatorDrawdowns({
      drawdowns,
      getCalculatorDrawdowns: emptyCalculatorDrawdowns,
    });

    expect(combinedDrawdowns).toBe(drawdowns);
  });

  const calculatorDrawdownsLength = 5;
  const calculatorAdvance = 20000000;
  const calculatorDate = "08/04/2020";
  const calculatorInterest = 500;
  const validCalculatorDrawdowns = Array(calculatorDrawdownsLength).fill({
    advance: calculatorAdvance,
    date: calculatorDate,
    interest: calculatorInterest,
  });

  const getValidCalculatorDrawdowns = () => validCalculatorDrawdowns;

  it("should use first advance from the calculator response", () => {
    const combinedDrawdowns = combineDrawdownsWithCalculatorDrawdowns({
      drawdowns,
      getCalculatorDrawdowns: getValidCalculatorDrawdowns,
    });

    expect(combinedDrawdowns[0].advance).toBe(calculatorAdvance);
    expect(combinedDrawdowns[0].date).toBe(drawdownsDate);
  });

  it("should use all drawdowns advances and dates from provided drawdowns and combine them with results from calculator", () => {
    const combinedDrawdowns = combineDrawdownsWithCalculatorDrawdowns({
      drawdowns,
      getCalculatorDrawdowns: getValidCalculatorDrawdowns,
    });

    combinedDrawdowns
      .slice(1, drawdownsLength)
      .forEach(({ advance, date, interest }) => {
        expect(advance).toBe(drawdownsAdvance);
        expect(date).toBe(drawdownsDate);
        expect(interest).toBe(calculatorInterest);
      });
  });

  it("should use calculator drawdowns for other results, except from the advance", () => {
    const combinedDrawdowns = combineDrawdownsWithCalculatorDrawdowns({
      drawdowns,
      getCalculatorDrawdowns: getValidCalculatorDrawdowns,
    });

    expect(combinedDrawdowns.length).toBe(calculatorDrawdownsLength);
    combinedDrawdowns
      .slice(drawdownsLength)
      .forEach(({ advance, date, interest }) => {
        expect(advance).toBe(null);
        expect(date).toBe(calculatorDate);
        expect(interest).toBe(calculatorInterest);
      });
  });
});
