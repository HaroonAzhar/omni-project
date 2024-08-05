import prepareDipDataForReduxStore from "../prepare_dip_data_for_redux_store";

describe("prepareDipDataForReduxStore", () => {
  it("company_name is correctly set from applicants", () => {
    const name = "TESTNAME";

    const { preApplication } = prepareDipDataForReduxStore({
      applicants: [
        {
          name,
        },
      ],
      type_of_applicant: "company",
    });

    expect(preApplication).toHaveProperty("company_name", name);
  });

  it("email is correctly set from applicants", () => {
    const email = "test@test.test";

    const { preApplication } = prepareDipDataForReduxStore({
      applicants: [
        {
          email,
        },
      ],
      email: undefined,
      type_of_applicant: "company",
    });

    expect(preApplication).toHaveProperty("email", email);
  });

  it("percent/value fields transform to flag and value field correctly", () => {
    const controlValue = 5;
    const states = ["percent", "value"];
    const fields = [
      "arrangement_fee_advance_date",
      "arrangement_fee_repayment_date",
      "intermediary_commission_fee",
    ];

    for (const fieldName of fields) {
      for (const state of states) {
        const { preApplication } = prepareDipDataForReduxStore({
          [`${fieldName}_${state}`]: controlValue,
        });

        expect(preApplication).toHaveProperty(
          `value_type_of_${fieldName}`,
          state
        );
        expect(preApplication).toHaveProperty(fieldName, controlValue);
      }
    }
  });

  it("whichApplicantStepToShow is set correctly", () => {
    const states = ["company", "individual"];

    for (const state of states) {
      const { preApplication } = prepareDipDataForReduxStore({
        applicants: [],
        type_of_applicant: state,
      });

      expect(preApplication).toHaveProperty("whichApplicantStepToShow", state);
    }
  });

  it.only("data are splitted by stores correctly", () => {
    const preparedData = prepareDipDataForReduxStore({
      type_of_application: "test",
      calculator_response: { a: 1 },
    });

    expect(preparedData).toHaveProperty("preApplication");
    expect(preparedData.preApplication).toHaveProperty("type_of_application");

    expect(preparedData).toHaveProperty("calculator");
    expect(preparedData.calculator).toHaveProperty("calculatorResponse");
  });
});
