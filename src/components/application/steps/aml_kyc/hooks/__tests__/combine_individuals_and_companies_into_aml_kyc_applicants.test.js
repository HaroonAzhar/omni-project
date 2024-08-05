import combineIndividualsAndCompaniesIntoAmlKycApplicants from "../helpers/combine_individuals_and_companies_into_aml_kyc_applicants";

describe("combine_individuals_and_companies_into_aml_kyc_applicants", () => {
  it("sample test case", () => {
    const individuals = [
      {
        applicant_id: 4,
        status: "Edited",
        date_edited: "2020-09-24T10:49:22.284Z",
        links: "foo bar",
        personal_data: {
          forename: "foo",
          surname: "bar",
          date_of_birth: "0001-09-03",
        },
        contact: {},
        declarations_signatures: {},
        addresses: [{ country: "united kingdom", how_long_here_years: 5 }],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
      {
        applicant_id: 5,
        status: "Edited",
        date_edited: "2020-09-24T11:55:21.294Z",
        links: "main shareholder",
        personal_data: {
          forename: "main",
          surname: "shareholder",
          date_of_birth: "0001-09-10",
          nationality: "British",
        },
        contact: {},
        declarations_signatures: {},
        addresses: [{ country: "united kingdom", how_long_here_years: 5 }],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
      {
        applicant_id: 6,
        status: "New",
        links: "/officers/pcGJLV-gFieOA3XfUN_gbqJullU/appointments",
        personal_data: { forename: "Daniel", surname: "Christey" },
        contact: {},
        declarations_signatures: {},
        addresses: [{}],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
      {
        applicant_id: 7,
        status: "New",
        links: "/officers/sX0MxSEFAnuJ-9ay7Cy6k3NnkME/appointments",
        personal_data: {
          forename: "Peter",
          middle_name: "James",
          surname: "Goodman",
        },
        contact: {},
        declarations_signatures: {},
        addresses: [{}],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
      {
        applicant_id: 8,
        status: "New",
        links: "/officers/2XSEFvc8FQvnKVj0jPiFeRTrPkQ/appointments",
        personal_data: { forename: "Matthew", surname: "Jonns" },
        contact: {},
        declarations_signatures: {},
        addresses: [{}],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
      {
        applicant_id: 9,
        status: "Edited",
        date_edited: "2020-09-24T11:55:49.090Z",
        links: "/officers/NAmyjU3iow0G9Golj8NboO1Ek9Y/appointments",
        personal_data: {
          forename: "Pawel",
          surname: "Kaminski",
          date_of_birth: "0002-09-02",
          second_nationality: "British",
          has_dual_nationality: true,
        },
        contact: {},
        declarations_signatures: {},
        addresses: [{ country: "united kingdom", how_long_here_years: 3 }],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
      {
        applicant_id: 10,
        status: "New",
        links: "/officers/HjyxLEK5gxcFYoEal1OoEZGl7jQ/appointments",
        personal_data: { forename: "Simon", surname: "Rendell" },
        contact: {},
        declarations_signatures: {},
        addresses: [{}],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
      {
        applicant_id: 11,
        status: "New",
        links: "/officers/T7S_4y46l8gDIqyzq9kw-W9gpjU/appointments",
        personal_data: {
          forename: "James",
          middle_name: "Steven",
          surname: "Shirley",
        },
        contact: {},
        declarations_signatures: {},
        addresses: [{}],
        liabilities: [],
        assets: [],
        property_portfolio: [],
      },
    ];
    const companies = [
      {
        applicant_id: 1,
        base_data: {
          name: "UCREATE LIMITED",
          email: "bartek@ucreate.it",
          company_number: "08503849",
          number_of_partners: "6",
          company_type: "ltd",
        },
        address: {
          is_correspondence_same: false,
          registered: {
            address_line_1: "12-18 Hoxton Street",
            postcode: "N1 6NG",
            city: "London",
            country: "england",
          },
          correspondence: {},
        },
        directors: [
          {
            name: "Daniel Christey",
            links: "/officers/pcGJLV-gFieOA3XfUN_gbqJullU/appointments",
          },
          {
            name: "Peter James Goodman",
            links: "/officers/sX0MxSEFAnuJ-9ay7Cy6k3NnkME/appointments",
          },
          {
            name: "Matthew Jonns",
            links: "/officers/2XSEFvc8FQvnKVj0jPiFeRTrPkQ/appointments",
          },
          {
            name: "Pawel Kaminski",
            links: "/officers/NAmyjU3iow0G9Golj8NboO1Ek9Y/appointments",
          },
          {
            name: "Simon Rendell",
            links: "/officers/HjyxLEK5gxcFYoEal1OoEZGl7jQ/appointments",
          },
          {
            name: "James Steven Shirley",
            links: "/officers/T7S_4y46l8gDIqyzq9kw-W9gpjU/appointments",
          },
        ],
        shared_holders: [
          {
            name: "company",
            held: "50.00",
            isCompany: true,
            company: [
              {
                name: "child company",
                held: "20.00",
                isCompany: true,
                company: [{ name: "foo bar", held: "50.00", isCompany: false }],
              },
            ],
            links: "company",
          },
          {
            name: "main shareholder",
            held: "50.00",
            isCompany: false,
            links: "main shareholder",
          },
        ],
        accountant: { address: { address_type: "accountant" } },
      },
      {
        applicant_id: 2,
        base_data: { name: "child company", email: "" },
        address: { is_correspondence_same: false },
      },
      {
        applicant_id: 3,
        base_data: { name: "company", email: "" },
        address: { is_correspondence_same: false },
      },
    ];

    const expectedApplicants = [
      {
        applicant_id: 4,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: false,
        label: "foo bar",
        isCompany: false,
        index: 0,
      },
      {
        applicant_id: 5,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: true,
        label: "main shareholder",
        isCompany: false,
        index: 1,
      },
      {
        applicant_id: 6,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: false,
        label: "Daniel Christey",
        isCompany: false,
        index: 2,
      },
      {
        applicant_id: 7,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: false,
        label: "Peter James Goodman",
        isCompany: false,
        index: 3,
      },
      {
        applicant_id: 8,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: false,
        label: "Matthew Jonns",
        isCompany: false,
        index: 4,
      },
      {
        applicant_id: 9,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: true,
        label: "Pawel Kaminski",
        isCompany: false,
        index: 5,
      },
      {
        applicant_id: 10,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: false,
        label: "Simon Rendell",
        isCompany: false,
        index: 6,
      },
      {
        applicant_id: 11,
        aml_kyc: {},
        isIndividualFromEeaSwiss: false,
        isIndividualFromIreland: false,
        isIndividualFromUK: false,
        label: "James Steven Shirley",
        isCompany: false,
        index: 7,
      },
      {
        applicant_id: 1,
        aml_kyc: {},
        index: 8,
        isCompany: true,
        label: "UCREATE LIMITED",
        shared_holders: [
          {
            name: "company",
            held: "50.00",
            isCompany: true,
            company: [
              {
                name: "child company",
                held: "20.00",
                isCompany: true,
                company: [{ name: "foo bar", held: "50.00", isCompany: false }],
              },
            ],
            links: "company",
          },
          {
            name: "main shareholder",
            held: "50.00",
            isCompany: false,
            links: "main shareholder",
          },
        ],
      },
      {
        applicant_id: 2,
        aml_kyc: {},
        index: 9,
        isCompany: true,
        label: "child company",
        shared_holders: undefined,
      },
      {
        index: 10,
        applicant_id: 3,
        aml_kyc: {},
        isCompany: true,
        label: "company",
        shared_holders: undefined,
      },
    ];

    const combinedApplicants = combineIndividualsAndCompaniesIntoAmlKycApplicants(
      individuals,
      companies
    );

    expect(combinedApplicants).toEqual(expectedApplicants);
  });
});
