import { wait, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form3 from "../forms/form_3";

describe("<CompanyDetailsForm3>", () => {
  const getComponentWithDefaultStore = (companyData, finalizeStep) =>
    getComponentWithRedux(
      Form3,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          companyData,
        },
      }
    );

  beforeAll(() => {
    setupGoogleApiMock();
  });

  it("Converts Companies House response into valid address when registered address not provided", async () => {
    const companyData = {
      address: {},
      companyDetailsResponse: {
        registered_office_address: {
          postal_code: "N1 6NG",
          country: "England",
          address_line_1: "12-18 Hoxton Street",
          locality: "London",
          care_of: "THE ACCOUNTANCY CLOUD",
        },
      },
    };
    const finalizeStep = jest.fn(() => {});
    const { getByText } = getComponentWithDefaultStore(
      companyData,
      finalizeStep
    );

    const expectedPayload = {
      data: {
        type_of_applicant: "company",
        address: {
          is_correspondence_same: undefined,
          correspondence: {
            address_line_1: undefined,
            address_line_2: undefined,
            postcode: undefined,
            city: undefined,
            country: undefined,
          },
          registered: {
            address_line_1: "12-18 Hoxton Street",
            address_line_2: undefined,
            postcode: "N1 6NG",
            city: "London",
            country: "england",
          },
        },
        base_data: {
          company_number: undefined,
          nature_of_business: undefined,
          trading_since: undefined,
        },
      },
      step_id: "company_details_form",
    };

    const continueButton = getByText(/Continue/i);
    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() => {
      expect(finalizeStep).toBeCalledWith(expectedPayload);
    });
  });

  it("If valid address provided returns it", async () => {
    const companyData = {
      address: {
        registered: {
          address_line_1: "Hoxton Street",
          address_line_2: "defined",
          postcode: "N1 6NG",
          city: "London",
          country: "united kingdom",
        },
      },
      companyDetailsResponse: {
        registered_office_address: {
          postal_code: "N1 6NG",
          country: "England",
          address_line_1: "12-18 Hoxton Street",
          locality: "London",
          care_of: "THE ACCOUNTANCY CLOUD",
        },
      },
    };
    const finalizeStep = jest.fn(() => {});
    const { getByText } = getComponentWithDefaultStore(
      companyData,
      finalizeStep
    );

    const expectedPayload = {
      data: {
        type_of_applicant: "company",
        address: {
          is_correspondence_same: undefined,
          correspondence: {
            address_line_1: undefined,
            address_line_2: undefined,
            postcode: undefined,
            city: undefined,
            country: undefined,
          },
          registered: {
            address_line_1: "Hoxton Street",
            address_line_2: "defined",
            postcode: "N1 6NG",
            city: "London",
            country: "united kingdom",
          },
        },
        base_data: {
          company_number: undefined,
          nature_of_business: undefined,
          trading_since: undefined,
        },
      },
      step_id: "company_details_form",
    };

    const continueButton = getByText(/Continue/i);
    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() => {
      expect(finalizeStep).toBeCalledWith(expectedPayload);
    });
  });
});
