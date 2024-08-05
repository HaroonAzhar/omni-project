import addCoreAndFinancialDetails from "../add_core_and_financial_details";

describe("Case summary document - add core and financial details", () => {
  const testReplacement = (entryLabel) => (calculatorResponse) => (
    expectedAmount
  ) => (type_of_loan) => {
    const data = {
      application: {
        type_of_loan,
        name: [],
        securities: [{ security_type: "" }],
      },
      calculator: {
        calculatorResponse,
      },
    };
    const lists = {
      replacementList: [],
      removeList: [],
    };
    addCoreAndFinancialDetails({ data, lists });

    const totalFacilityExcludingInterestEntry = lists.replacementList.filter(
      (entry) => entry.var === entryLabel
    )[0];
    expect(totalFacilityExcludingInterestEntry.value).toEqual(expectedAmount);
  };

  describe("totalFacility", () => {
    const testWithResponse = testReplacement("totalFacility");

    describe("uses existing total_loan_facility_excluding_interest", () => {
      const testWithExisting = testWithResponse({
        total_loan_facility_excluding_interest: 1000,
      })(["1,000"]);

      it("Rolled up", () => {
        testWithExisting("rolled_up");
      });
      it("Retained", () => {
        testWithExisting("retained");
      });
      it("Serviced", () => {
        testWithExisting("serviced");
      });
    });

    describe("uses other filed when total_loan_facility_excluding_interest missing", () => {
      const testWithMissing = testWithResponse({
        total_loan_facility: 1000,
        advanced_interest: 100,
      });
      it("Rolled up", () => {
        testWithMissing(["1,000"])("rolled_up");
      });
      it("Retained", () => {
        testWithMissing(["900"])("retained");
      });
      it("Serviced", () => {
        testWithMissing(["1,000"])("serviced");
      });
    });
  });

  describe("totalFacilityIncludingInterest", () => {
    const testWithResponse = testReplacement("totalFacilityIncludingInterest");

    describe("uses existing total_loan_facility_excluding_interest", () => {
      const testWithExisting = testWithResponse({
        gross_amount_at_maturity: 1100,
      })(["1,100"]);

      it("Rolled up", () => {
        testWithExisting("rolled_up");
      });
      it("Retained", () => {
        testWithExisting("retained");
      });
      it("Serviced", () => {
        testWithExisting("serviced");
      });
    });

    describe("uses other fields when total_loan_facility_excluding_interest missing", () => {
      const calculatorResponse = {
        total_loan_facility: 1000,
        advanced_interest: 100,
      };
      const testWithMissing = testWithResponse(calculatorResponse);
      it("Rolled up", () => {
        testWithMissing(["1,100"])("rolled_up");
      });
      it("Retained", () => {
        testWithMissing(["1,000"])("retained");
      });
      it("Serviced", () => {
        testWithMissing(["1,100"])("serviced");
      });

      const drawdowns = [{ interest: 10 }, { interest: 20 }];
      it("Rolled up with drawdowns", () => {
        testWithResponse({
          ...calculatorResponse,
          drawdowns,
        })(["1,030"])("rolled_up");
      });

      it("Rolled up with total_interest", () => {
        testWithResponse({
          ...calculatorResponse,
          drawdowns,
          total_interest: 200,
        })(["1,200"])("rolled_up");
      });
    });
  });
});
