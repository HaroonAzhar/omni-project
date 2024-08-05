import { mergeCompanies, mergeIndividuals } from "./merge_to_applicants";

describe("Merge contacts, individuals and companies into applicants", () => {
  describe("mergeCompanies", () => {
    it("Merges companies with the same name", () => {
      const companies = [{ Name: "foo" }];
      const contacts = [
        {
          Name: "foo",
          ContactType: "company",
        },
      ];

      const applicants = mergeCompanies({ companies, contacts });
      expect(applicants).toEqual([expect.objectContaining({ Name: "foo" })]);
    });

    it("Merges companies with the same name, keeping values", () => {
      const companies = [{ Name: "foo", Email: "foo_email" }, { Name: "bar" }];
      const contacts = [
        {
          Name: "foo",
          ContactType: "company",
        },
        {
          Name: "bar",
          ContactType: "company",
          Email: "bar_email",
        },
      ];

      const applicants = mergeCompanies({ companies, contacts });
      expect(applicants).toEqual([
        expect.objectContaining({ Name: "foo", Email: "foo_email" }),
        expect.objectContaining({ Name: "bar", Email: "bar_email" }),
      ]);
    });

    it("Uses contacts", () => {
      const companies = [];
      const contacts = [
        { Name: "not a company" },
        { Name: "name", ContactType: "company" },
      ];

      const applicants = mergeCompanies({ companies, contacts });
      expect(applicants).toEqual([expect.objectContaining({ Name: "name" })]);
    });

    it("Uses companies", () => {
      const companies = [{ Name: "name" }];
      const contacts = [];

      const applicants = mergeCompanies({ companies, contacts });
      expect(applicants).toEqual([expect.objectContaining({ Name: "name" })]);
    });
  });
  describe("mergeIndividuals", () => {
    it("Merges individuals with the same name", () => {
      const individuals = [{ Forename: "Forename", Surname: "Surname" }];
      const contacts = [
        {
          Name: "Forename Surname",
          ContactType: "individual",
        },
      ];

      const applicants = mergeIndividuals({ individuals, contacts });
      expect(applicants).toEqual([
        expect.objectContaining({ Name: "Forename Surname" }),
      ]);
    });

    it("Merges individuals with the same name, keeping values", () => {
      const individuals = [
        { Forename: "Forename", Surname: "Surname", WorkPhone: "WorkPhone" },
        {
          Forename: "Forename",
          Surname: "Surname",
          MiddleName: "MiddleName",
        },
      ];
      const contacts = [
        {
          Name: "Forename Surname",
        },
        {
          Name: "Forename MiddleName Surname",
          addresses: ["first address"],
        },
      ];

      const applicants = mergeIndividuals({ individuals, contacts });
      expect(applicants).toEqual([
        expect.objectContaining({
          Name: "Forename Surname",
          WorkPhone: "WorkPhone",
        }),
        expect.objectContaining({
          Name: "Forename MiddleName Surname",
          addresses: ["first address"],
        }),
      ]);
    });

    it("Uses individuals", () => {
      const individuals = [{ Forename: "Forename", Surname: "Surname" }];
      const contacts = [];

      const applicants = mergeIndividuals({ individuals, contacts });
      expect(applicants).toEqual([
        expect.objectContaining({ Name: "Forename Surname" }),
      ]);
    });

    it("Uses contacts", () => {
      const individuals = [];
      const contacts = [{ Name: "name" }];

      const applicants = mergeIndividuals({ individuals, contacts });
      expect(applicants).toEqual([expect.objectContaining({ Name: "name" })]);
    });
  });
});
