import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form1 from "../forms/form_1";

describe("<CompanyDetailsForm1>", () => {
  const getComponentWithDefaultStore = (application, finalizeStep) =>
    getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application,
      }
    );

  beforeAll(() => {
    setupGoogleApiMock();
  });

  it("Company name field is disabled", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = getComponentWithDefaultStore(finalizeStep, {
      application: {},
    });

    const field = getByLabelText(/Company name/i);

    expect(field.disabled).toBe(true);
  });

  it("Find company button is hidden", async () => {
    const finalizeStep = jest.fn(() => {});

    const { queryByText } = getComponentWithDefaultStore(finalizeStep, {
      application: {},
    });

    const findButton = queryByText(/Find company/i);

    expect(findButton).toBeNull();
  });

  it("Email field is disabled", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = getComponentWithDefaultStore(finalizeStep, {
      application: {},
    });

    const field = getByLabelText(/Email/i);

    expect(field.disabled).toBe(true);
  });
});
