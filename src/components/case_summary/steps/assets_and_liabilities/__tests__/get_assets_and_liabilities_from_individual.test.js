import getAssetsAndLiabilitiesFromIndividual from "../get_assets_and_liabilities_from_individual";
import testingInput from "./testing_input";
import correctOutput from "./correct_output";

it("Assets and liabilities get a correct data to display", () => {
  const testedOutput = getAssetsAndLiabilitiesFromIndividual(testingInput);
  expect(testedOutput).toMatchObject(correctOutput);
});
