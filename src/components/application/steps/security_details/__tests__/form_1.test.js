import { wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form1 from "../forms/form_1";

describe("<SecurityDetailsForm1>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });
  it("Fill property address with property from redux", async () => {
    const address = {
      line_1: "75, Bilton Way",
      line_2: "Greater London, England",
      city: "Enfield",
      country: "united kingdom",
      postcode: "EN3 7ER",
    };
    const { getByLabelText } = getComponentWithRedux(
      Form1,
      {
        finalizeStep: () => {},
        goStepBack: () => {},
      },
      {
        application: {
          properties: [
            {
              address,
            },
          ],
        },
      }
    );

    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const country = getByLabelText(/Country/i);
    const postCode = getByLabelText(/Postcode/i);

    await wait(() => {
      expect(addressLine1.value).toBe(address.line_1);
      expect(addressLine2.value).toBe(address.line_2);
      expect(townCity.value).toBe(address.city);
      expect(country.value).toBe(address.country);
      expect(postCode.value).toBe(address.postcode);
    });
  });
});
