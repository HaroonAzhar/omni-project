import {
  Fields,
  BorrowerNameIndividual,
  BorrowerNameCompany,
  OtherImportantFields,
} from "../../pdf/fields";
describe("PDF Fields TestCase", () => {
  test("should have proper fields", () => {
    Fields.forEach((value) => {
      expect(value).toHaveProperty("name");
      expect(value).toHaveProperty("label");
    });

    BorrowerNameIndividual.forEach((value) => {
      expect(value).toHaveProperty("name");
      expect(value).toHaveProperty("label");
    });

    BorrowerNameCompany.forEach((value) => {
      expect(value).toHaveProperty("name");
      expect(value).toHaveProperty("label");
    });

    OtherImportantFields.forEach((value) => {
      expect(value).toHaveProperty("name");
      expect(value).toHaveProperty("label");
    });
  });
});
