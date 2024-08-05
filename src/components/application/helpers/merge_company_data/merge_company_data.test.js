import mergeCompanyData from ".";

describe("Merge company data", () => {
  it("Uses appointments links for the new one from the Companies House", () => {
    const companyOfficersResponse = {
      items: [
        {
          officer_role: "director",
          name: "Foo bar",
          links: { officer: { appointments: "link" } },
        },
      ],
    };

    const expectedDirectors = [
      { name: "Foo Bar", links: "link", is_guarantor: true },
    ];
    const companyData = { companyOfficersResponse };
    const { directors: mergedDirectors } = mergeCompanyData(companyData);

    expect(mergedDirectors).toEqual(expectedDirectors);
  });

  it("Dip company number is the source of truth for name and company_number", () => {
    const base_data = { name: "Foo bar", company_number: "old number" };

    const companyNumber = "new number";
    const companyName = "new name";
    const expectedBaseData = {
      name: companyName,
      company_number: companyNumber,
    };
    const companyData = { base_data, companyName, companyNumber };
    const { base_data: mergedBaseData } = mergeCompanyData(companyData);

    expect(mergedBaseData).toEqual(expectedBaseData);
  });

  it("Passes date of creation from CH", () => {
    const date_of_creation = "2001-05-23";
    const companyDetailsResponse = {
      date_of_creation,
      registered_office_address: {},
    };
    const expectedBaseData = {
      date_of_creation,
    };
    const companyData = { companyDetailsResponse };
    const { base_data: mergedBaseData } = mergeCompanyData(companyData);

    expect(mergedBaseData).toEqual(expectedBaseData);
  });
});
