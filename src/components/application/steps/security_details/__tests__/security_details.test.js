import { setupGoogleApiMock, getComponentWithRedux } from "test_helpers";
import { mockPostcoder } from "test_helpers/mocks";

import Form1 from "../forms/form_1";

describe("<SecurityDetails>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
    mockPostcoder();
  });

  const addressIsDisabled = (getByLabelText) => {
    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const postcode = getByLabelText(/Postcode/i);
    const country = getByLabelText(/Country/i);

    expect(addressLine1.disabled).toBe(true);
    expect(addressLine2.disabled).toBe(true);
    expect(townCity.disabled).toBe(true);
    expect(postcode.disabled).toBe(true);
    expect(country.disabled).toBe(true);
  };

  it("Address is disabled when address is provided", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText, getByText } = getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          properties: [{ address: { line_1: "foo" } }],
        },
      }
    );

    addressIsDisabled(getByLabelText, getByText);
  });
});
