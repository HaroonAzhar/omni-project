import prepareDataForCaseSummary from "..";
import * as calculatorDataServiced from "./json/serviced/input/calculator";
import * as applicationDataServiced from "./json/serviced/input/application";
import * as calculatorDataRolledUp from "./json/rolled_up/input/calculator";
import * as applicationDataRolledUp from "./json/rolled_up/input/application";
import * as calculatorRetained from "./json/retained/calculator";
import * as applicationRetained from "./json/retained/application";
import * as dataServicedServicing from "./json/servicing_retained/data";

jest.spyOn(Date, "now").mockImplementation(() => 1479427200000);
describe("Prepare Data for case summary", () => {
  test("should return matching output for serviced case", () => {
    const output = prepareDataForCaseSummary({
      calculator: calculatorDataServiced,
      application: applicationDataServiced,
    });
    expect(output).toMatchSnapshot();
  });

  test("should return matching output for rolled up case", () => {
    const output = prepareDataForCaseSummary({
      calculator: calculatorDataRolledUp,
      application: applicationDataRolledUp,
    });
    expect(output).toMatchSnapshot();
  });

  test("should return matching output for retained case", () => {
    const output = prepareDataForCaseSummary({
      calculator: calculatorRetained,
      application: applicationRetained,
    });
    expect(output).toMatchSnapshot();
  });

  test("should return matching output for retained servicing", () => {
    const output = prepareDataForCaseSummary(dataServicedServicing);
    expect(output).toMatchSnapshot();
  });
});
