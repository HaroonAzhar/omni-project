import splitApplicantsIntoGroups from "../helpers/split_applicants_into_groups";

describe("combine_individuals_and_companies_into_aml_kyc_applicants", () => {
  it("sample test case", () => {
    const applicants = [
      {
        applicant_id: 4,
        aml_kyc: {},
        isIndividualFromUK: false,
        label: "foo bar",
        isCompany: false,
      },
      {
        applicant_id: 5,
        aml_kyc: {},
        isIndividualFromUK: true,
        label: "main shareholder",
        isCompany: false,
      },
      {
        applicant_id: 6,
        aml_kyc: {},
        isIndividualFromUK: false,
        label: "Daniel Christey",
        isCompany: false,
      },
      {
        applicant_id: 7,
        aml_kyc: {},
        isIndividualFromUK: false,
        label: "Peter James Goodman",
        isCompany: false,
      },
      {
        applicant_id: 8,
        aml_kyc: {},
        isIndividualFromUK: false,
        label: "Matthew Jonns",
        isCompany: false,
      },
      {
        applicant_id: 9,
        aml_kyc: {},
        isIndividualFromUK: true,
        label: "Pawel Kaminski",
        isCompany: false,
      },
      {
        applicant_id: 10,
        aml_kyc: {},
        isIndividualFromUK: false,
        label: "Simon Rendell",
        isCompany: false,
      },
      {
        applicant_id: 11,
        aml_kyc: {},
        isIndividualFromUK: false,
        label: "James Steven Shirley",
        isCompany: false,
      },
      {
        applicant_id: 1,
        aml_kyc: {},
        isCompany: true,
        label: "UCREATE LIMITED",
      },
      { applicant_id: 2, aml_kyc: {}, isCompany: true, label: "child company" },
      { applicant_id: 3, aml_kyc: {}, isCompany: true, label: "company" },
    ];

    const expectedGroupedApplicants = {
      ukIndividuals: [
        {
          applicant_id: 5,
          aml_kyc: {},
          isIndividualFromUK: true,
          label: "main shareholder",
          isCompany: false,
        },
        {
          applicant_id: 9,
          aml_kyc: {},
          isIndividualFromUK: true,
          label: "Pawel Kaminski",
          isCompany: false,
        },
      ],
      nonUkIndividuals: [
        {
          applicant_id: 4,
          aml_kyc: {},
          isIndividualFromUK: false,
          label: "foo bar",
          isCompany: false,
        },
        {
          applicant_id: 6,
          aml_kyc: {},
          isIndividualFromUK: false,
          label: "Daniel Christey",
          isCompany: false,
        },
        {
          applicant_id: 7,
          aml_kyc: {},
          isIndividualFromUK: false,
          label: "Peter James Goodman",
          isCompany: false,
        },
        {
          applicant_id: 8,
          aml_kyc: {},
          isIndividualFromUK: false,
          label: "Matthew Jonns",
          isCompany: false,
        },
        {
          applicant_id: 10,
          aml_kyc: {},
          isIndividualFromUK: false,
          label: "Simon Rendell",
          isCompany: false,
        },
        {
          applicant_id: 11,
          aml_kyc: {},
          isIndividualFromUK: false,
          label: "James Steven Shirley",
          isCompany: false,
        },
      ],
      companies: [
        {
          applicant_id: 1,
          aml_kyc: {},
          isCompany: true,
          label: "UCREATE LIMITED",
        },
        {
          applicant_id: 2,
          aml_kyc: {},
          isCompany: true,
          label: "child company",
        },
        { applicant_id: 3, aml_kyc: {}, isCompany: true, label: "company" },
      ],
    };

    const groupedApplicants = splitApplicantsIntoGroups(applicants);

    expect(groupedApplicants).toEqual(expectedGroupedApplicants);
  });
});
