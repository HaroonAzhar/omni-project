import { canNotNavigateTo } from "..";
import { structureOfEntries } from "./data_for_test.json";

describe("Can not navigate to in shareholders breadcrumb", () => {
  describe("Nested structure", () => {
    const nestedStructure = {
      main: ["left_1", "right_1"],
      left_1: ["left_2"],
      left_2: ["left_3"],
      left_3: ["left_4"],
      left_4: ["left_5"],
      left_5: [],
      right_1: ["right_2"],
      right_2: ["right_3"],
      right_3: ["right_4"],
      right_4: ["right_5"],
      right_5: [],
    };

    it("Single top error", () => {
      const errors = {
        left_5: { isCompany: "error text" },
      };

      const expectedCanNotNavigate = ["left_3", "left_2", "left_1", "main"];
      const actualCanNotNavigateTo = canNotNavigateTo(nestedStructure, errors);

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });

    it("Single middle error", () => {
      const errors = {
        left_3: { isCompany: "error text" },
      };

      const expectedCanNotNavigate = ["left_1", "main"];
      const actualCanNotNavigateTo = canNotNavigateTo(nestedStructure, errors);

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });

    it("double  errors", () => {
      const errors = {
        left_3: { isCompany: "error text" },
        right_5: { foo: "bar" },
      };

      const expectedCanNotNavigate = [
        "left_1",
        "main",
        "right_3",
        "right_2",
        "right_1",
      ];
      const actualCanNotNavigateTo = canNotNavigateTo(nestedStructure, errors);

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });

    it("bottom  errors", () => {
      const errors = {
        left_1: { isCompany: "error text" },
        right_1: { foo: "bar" },
      };

      const expectedCanNotNavigate = [];
      const actualCanNotNavigateTo = canNotNavigateTo(nestedStructure, errors);

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });

    it("no  errors", () => {
      const errors = {};

      const expectedCanNotNavigate = [];
      const actualCanNotNavigateTo = canNotNavigateTo(nestedStructure, errors);

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });
  });

  describe("Test data", () => {
    it("Can not navigate to the parent when error 2 levels below", () => {
      const errors = {
        "0d507a24-7d94-4b1a-a0a8-38a34cb04e36": { isCompany: "error text" },
      };

      const expectedCanNotNavigate = ["main"];
      const actualCanNotNavigateTo = canNotNavigateTo(
        structureOfEntries,
        errors
      );

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });

    it("Handles 2 errors", () => {
      const errors = {
        "0d507a24-7d94-4b1a-a0a8-38a34cb04e36": { isCompany: "error text" },
        "1a6a4b6e-29c9-4cb7-bc7d-785533db1a3e": { other: "text" },
      };

      const expectedCanNotNavigate = ["main"];
      const actualCanNotNavigateTo = canNotNavigateTo(
        structureOfEntries,
        errors
      );

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });

    it("Errors can be visible in the 1 level", () => {
      const errors = {
        "8ec295a3-977e-4818-9a48-580f3ac35420": { isCompany: "error text" },
        "6b8bd874-3083-42dc-b362-4de90af1a6a0": { other: "text" },
      };

      const expectedCanNotNavigate = [];
      const actualCanNotNavigateTo = canNotNavigateTo(
        structureOfEntries,
        errors
      );

      expect(actualCanNotNavigateTo.sort()).toEqual(
        expectedCanNotNavigate.sort()
      );
    });
  });
});
