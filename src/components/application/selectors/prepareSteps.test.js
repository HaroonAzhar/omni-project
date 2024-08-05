import prepareSteps from "./prepareSteps";

const getStep = (steps, stepName) =>
  steps.find(({ name }) => name === stepName);

describe("prepareSteps for Application home screen", () => {
  it("Should set properties security_details step", () => {
    const steps = [
      {
        name: "security_details",
        status: "Edited",
      },
    ];

    const properties = [
      {
        status: "New",
      },
      {
        status: "Edited",
      },
    ];
    const expectedStatus = "1 of 2 Edited";
    const applicants = [];
    const preparedSteps = prepareSteps(steps, properties, applicants);

    expect(getStep(preparedSteps, "security_details").status).toBe(
      expectedStatus
    );
  });

  it("Should keep original status when none edited", () => {
    const steps = [
      {
        name: "security_details",
        status: "Recheck",
      },
    ];

    const properties = [
      {
        status: "New",
      },
      {
        status: "New",
      },
    ];
    const expectedStatus = "Recheck";
    const applicants = [];
    const preparedSteps = prepareSteps(steps, properties, applicants);

    expect(getStep(preparedSteps, "security_details").status).toBe(
      expectedStatus
    );
  });

  it("Should set applicant_details step", () => {
    const steps = [
      {
        name: "applicant_details",
        status: "Edited",
      },
    ];

    const properties = [];
    const expectedStatus = "1 of 2 Edited";
    const individuals = [
      {
        status: "Edited",
      },
      {
        result: {},
      },
    ];
    const preparedSteps = prepareSteps(steps, properties, individuals);

    expect(getStep(preparedSteps, "applicant_details").status).toBe(
      expectedStatus
    );
  });

  it("Should set credit_history step", () => {
    const steps = [
      {
        name: "credit_history",
        status: "Edited",
      },
    ];

    const properties = [];
    const expectedStatus = "1 of 2 Edited";
    const applicants = [
      {
        credit_history: {
          status: "Edited",
        },
      },
      {},
    ];
    const preparedSteps = prepareSteps(steps, properties, applicants);

    expect(getStep(preparedSteps, "credit_history").status).toBe(
      expectedStatus
    );
  });

  it("Should set assets_liabilities step", () => {
    const steps = [
      {
        name: "assets_and_liabilities",
        status: "Edited",
      },
    ];

    const properties = [];
    const expectedStatus = "1 of 2 Edited";
    const applicants = [
      {
        assets_liabilities_additional: {
          status: "Edited",
        },
      },
      {},
    ];
    const preparedSteps = prepareSteps(steps, properties, applicants);

    expect(getStep(preparedSteps, "assets_and_liabilities").status).toBe(
      expectedStatus
    );
  });

  it("Should keep original status for other steps", () => {
    const steps = [
      {
        name: "loan_details",
        status: "New",
      },
    ];

    const properties = [];
    const expectedStatus = "New";
    const applicants = [
      {
        assets_liabilities_additional: {
          status: "Edited",
        },
      },
      {},
    ];
    const preparedSteps = prepareSteps(steps, properties, applicants);

    expect(getStep(preparedSteps, "loan_details").status).toBe(expectedStatus);
  });
});
