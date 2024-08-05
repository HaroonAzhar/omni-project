import fillIndividualsWithOtherData from "./fill_individuals_with_other_data";

const companyApplication = {
  type_of_applicant: "company",
};

describe("Fill individuals with other data TestCase", () => {
  const applicants = [
    {
      forename: "Applicant",
      middle_name: "middle",
      surname: "1",
      email: "email1",
    },
    { forename: "Applicant", surname: "2", email: "email2" },
  ];
  describe("Individual application", () => {
    const individualApplication = {
      type_of_applicant: "individual",
    };
    const individualCaseResponseData = {
      ...individualApplication,
      applicants,
    };
    test("Should copy individual applicant with empty individuals", () => {
      // Given
      const emptyApplicantsResponse = {
        individuals: [],
        company: [],
      };

      const expectedIndividuals = [
        {
          personal_data: {
            forename: "Applicant",
            surname: "1",
            middle_name: "middle",
            date_of_birth: undefined,
          },
          addresses: [{}],
          contact: { email: "email1" },
          status: "New",
          notReady: true,
        },
        {
          personal_data: {
            forename: "Applicant",
            surname: "2",
            middle_name: undefined,
          },
          addresses: [{}],
          contact: { email: "email2" },
          status: "New",
          notReady: true,
        },
      ];

      // When
      const individuals = fillIndividualsWithOtherData(
        emptyApplicantsResponse,
        individualCaseResponseData
      );

      // Then
      expect(individuals).toEqual(expectedIndividuals);
    });
    test("Should use the forename and surname from the applicants and rest of the data from the individuals", () => {
      // Given
      const existingIndividuals = [
        {
          personal_data: {
            forename: "foo",
            surname: "foo_surname",
            middle_name: "foo_middle_name",
            additional_field: "additional_foo",
          },
          additional_property: "additional_property",
        },
        {
          personal_data: {
            forename: "bar",
            surname: "bar_surname",
            middle_name: "bar_middle_name",
            additional_field: "additional_bar",
          },
          additional_property: "additional_property",
        },
        {
          personal_data: {
            forename: "foobar",
            surname: "foobar_surname",
            middle_name: "foobar_middle_name",
            additional_field: "additional_foobar",
          },
          additional_property: "additional_property",
        },
      ];
      const applicantsResponse = {
        individuals: existingIndividuals,
        company: [],
      };

      const expectedIndividuals = [
        {
          personal_data: {
            forename: "Applicant",
            surname: "1",
            middle_name: "foo_middle_name",
            additional_field: "additional_foo",
          },
          additional_property: "additional_property",
        },
        {
          personal_data: {
            forename: "Applicant",
            surname: "2",
            middle_name: "bar_middle_name",
            additional_field: "additional_bar",
          },
          additional_property: "additional_property",
        },
      ];

      // When
      const individuals = fillIndividualsWithOtherData(
        applicantsResponse,
        individualCaseResponseData
      );

      // Then
      expect(individuals).toStrictEqual(expectedIndividuals);
    });

    test("Filters Applicants which have applicant_id as they are existing individuals", () => {
      const applicantsResponse = {
        individuals: [],
        company: [],
      };

      const caseResponseData = {
        ...individualApplication,
        applicants: [
          { forename: "name" },
          { forename: "other", surname: "name", applicant_id: 123 },
        ],
      };
      // When
      const individuals = fillIndividualsWithOtherData(
        applicantsResponse,
        caseResponseData
      );

      // Then
      expect(individuals.length).toBe(1);
    });
  });

  describe("Company application", () => {
    const companyCaseResponse = {
      ...companyApplication,
      applicants,
    };
    test("Should return empty if company is empty on company application ", () => {
      // Given
      const emptyApplicantsResponse = {
        individuals: [],
        company: [],
      };
      // When
      const individuals = fillIndividualsWithOtherData(
        emptyApplicantsResponse,
        companyCaseResponse
      );

      // Then
      expect(individuals).toStrictEqual([]);
    });

    test("Should use existing individual instead of director", () => {
      // Given
      const companyApplicantsResponse = {
        individuals: [
          {
            personal_data: {
              forename: "Forename",
              surname: "director",
              middle_name: "MiddleName",
            },
            addresses: [{}],
            additional_field: "sth",
          },
        ],
        company: [
          {
            directors: [
              {
                name: "Forename MiddleName director",
                irrelevant_field: "value",
              },
            ],
          },
        ],
      };
      const expectedIndividuals = [
        {
          personal_data: {
            forename: "Forename",
            surname: "director",
            middle_name: "MiddleName",
          },
          addresses: [{}],
          additional_field: "sth",
        },
      ];
      // When
      const individuals = fillIndividualsWithOtherData(
        companyApplicantsResponse,
        companyCaseResponse
      );

      // Then
      expect(individuals).toStrictEqual(expectedIndividuals);
    });
    test("Should use existing individual instead of shareholder", () => {
      // Given
      const companyApplicantsResponse = {
        individuals: [
          {
            personal_data: {
              forename: "Forename",
              surname: "shared_holder",
              middle_name: "MiddleName",
            },
            addresses: [{}],
            additional_field: "sth",
          },
        ],
        company: [
          {
            shared_holders: [
              { name: "Forename MiddleName shared_holder", held: 40 },
            ],
          },
        ],
      };
      const expectedIndividuals = [
        {
          personal_data: {
            forename: "Forename",
            surname: "shared_holder",
            middle_name: "MiddleName",
          },
          addresses: [{}],
          additional_field: "sth",
        },
      ];
      // When
      const individuals = fillIndividualsWithOtherData(
        companyApplicantsResponse,
        companyCaseResponse
      );

      // Then
      expect(individuals).toStrictEqual(expectedIndividuals);
    });
  });
});
