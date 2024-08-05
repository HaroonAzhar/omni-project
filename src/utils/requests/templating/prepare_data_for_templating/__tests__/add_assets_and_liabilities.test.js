import addAssetsAndLiabilities from "../add_assets_and_liabilities_replacements";

describe("Case summary document - add core and financial details", () => {
  const testReplacement = (entryLabel) => (type_of_applicant) => (
    expectedValue
  ) => {
    const data = {
      application: {
        type_of_applicant,
        individuals: [],
      },
    };
    const lists = {
      replacementList: [],
      removeList: [],
    };
    addAssetsAndLiabilities({ data, lists });

    const totalFacilityExcludingInterestEntry = lists.replacementList.filter(
      (entry) => entry.var === entryLabel
    )[0];
    expect(totalFacilityExcludingInterestEntry.value).toEqual(expectedValue);
  };

  describe("totalAssets", () => {
    const testWithResponse = testReplacement("totalAssets");

    it("company applicant", () => {
      testWithResponse("company")([
        "0 (the UBOs share of the values advised below)",
      ]);
    });

    it("individual applicant", () => {
      testWithResponse("individual")(["0"]);
    });
  });

  describe("totalLiabilities", () => {
    const testWithResponse = testReplacement("totalAssets");

    it("company applicant", () => {
      testWithResponse("company")([
        "0 (the UBOs share of the values advised below)",
      ]);
    });

    it("individual applicant", () => {
      testWithResponse("individual")(["0"]);
    });
  });
});
