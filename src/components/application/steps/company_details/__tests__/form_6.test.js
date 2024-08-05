import { wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form6 from "../forms/form_6";

describe("<CompanyDetailsForm6>", () => {
  const getComponentWithDefaultStore = () =>
    getComponentWithRedux(
      Form6,
      {
        finalizeStep: () => {},
        goStepBack: () => {},
      },
      {
        application: {},
      }
    );

  beforeAll(() => {
    setupGoogleApiMock();
  });

  it("Has company accountant firm", async () => {
    const { getByLabelText } = getComponentWithDefaultStore();

    await wait(() => {
      expect(getByLabelText(/Company accountant firm/i)).toBeDefined();
    });
  });
});
