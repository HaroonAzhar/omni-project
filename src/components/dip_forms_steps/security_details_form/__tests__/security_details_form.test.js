import { fireEvent, act, wait } from "@testing-library/react";

import {
  setupGoogleApiMock,
  checkIfAddressInputsAreRendered,
  getComponentWithRedux,
  searchAndClickSelectedAddress,
} from "test_helpers";
import { mockPostcoder } from "test_helpers/mocks";

import SecurityDetailsForm from "../index";

const defaultProps = {
  finalizeStep: () => {},
  goStepBack: () => {},
  canSkipAddressValidation: false,
};

const testSecurityDetailsWithoutFilledAddress = async ({
  canSkipAddressValidation,
  finalizeStepShouldBeCalledTimes,
}) => {
  const finalizeStep = jest.fn(() => {});

  const { getByText } = getComponentWithRedux(
    SecurityDetailsForm,
    {
      ...defaultProps,
      finalizeStep,
      canSkipAddressValidation,
    },
    {
      dip: {
        securities: [
          {
            SecurityInitialEstimation: "12.00",
            SecurityType: "commercial",
            OpflType: "first_charge",
          },
        ],
      },
    }
  );

  const continueButton = getByText(/Continue/i);

  act(() => {
    fireEvent.click(continueButton);
  });

  await wait(() => {
    expect(finalizeStep).toHaveBeenCalledTimes(finalizeStepShouldBeCalledTimes);
  });
};

describe("<SecurityDetailsForm>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
    mockPostcoder();
  });

  describe("<SecurityInput>", () => {
    it("Click on 'Cancel Search' shows address inputs", async () => {
      const { getByLabelText, getByText } = getComponentWithRedux(
        SecurityDetailsForm,
        defaultProps,
        {
          dip: {},
        }
      );

      const addManuallyButton = getByText(/Cancel Search/i);

      act(() => {
        fireEvent.click(addManuallyButton);
      });

      checkIfAddressInputsAreRendered(getByLabelText);
    });
  });

  it("Address manual inputs should be showed when the state contain address data", async () => {
    const security = {
      SecurityAddressLine1: "Regent Street",
      SecurityAddressLine2: "Greater London, England",
      SecurityTownCity: "London",
      SecurityPostcode: "ML1",
      SecurityCountry: "united kingdom",
    };

    const { getByLabelText } = getComponentWithRedux(
      SecurityDetailsForm,
      defaultProps,
      {
        dip: {
          securities: [security],
        },
      }
    );

    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const postcode = getByLabelText(/Postcode/i);
    const country = getByLabelText(/Country/i);

    expect(addressLine1.value).toBe(security.SecurityAddressLine1);
    expect(addressLine2.value).toBe(security.SecurityAddressLine2);
    expect(townCity.value).toBe(security.SecurityTownCity);
    expect(postcode.value).toBe(security.SecurityPostcode);
    expect(country.value).toBe(security.SecurityCountry);
  });

  it("Should be able to pass step with filled address inputs after enter address in the autocomplete", async () => {
    const finalizeStep = jest.setTimeout(15000).fn(() => {});

    const { getByLabelText, getByText } = getComponentWithRedux(
      SecurityDetailsForm,
      {
        ...defaultProps,
        finalizeStep,
      },
      {
        dip: {
          securities: [
            {
              SecurityInitialEstimation: "12.00",
              CurrentEstimated90DayMarketValue: "800.00",
              SecurityType: "commercial",
              OpflType: "first_charge",
            },
          ],
        },
      }
    );

    const continueButton = getByText(/Continue/i);

    await searchAndClickSelectedAddress(getByText, getByLabelText);

    await wait(() => checkIfAddressInputsAreRendered(getByLabelText));

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          securities: [
            expect.objectContaining({
              OpflType: "first_charge",
              SecurityAddressLine1: "Allies Computing Ltd",
              SecurityAddressLine2:
                "Manor Farm Barns, Fox Road, Framingham Pigot",
              SecurityCountry: "united kingdom",
              SecurityInitialEstimation: "12.00",
              SecurityPostcode: "NR14 7PZ",
              SecurityTownCity: "Norwich",
              SecurityType: "commercial",
            }),
          ],
        },
        stepId: "securities",
      });
    });
  });

  it("Should pass without filled addresses input", async () => {
    await testSecurityDetailsWithoutFilledAddress({
      canSkipAddressValidation: true,
      finalizeStepShouldBeCalledTimes: 1,
    });
  });

  it("Should not pass without filled addresses input", async () => {
    await testSecurityDetailsWithoutFilledAddress({
      canSkipAddressValidation: false,
      finalizeStepShouldBeCalledTimes: 0,
    });
  });

  it('Input "Current estimated 90 Day market value of security" is rendered correctly', () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = getComponentWithRedux(
      SecurityDetailsForm,
      {
        ...defaultProps,
        finalizeStep,
      },
      {
        dip: {
          securities: [{}],
        },
      }
    );

    const inputElement = getByLabelText(
      /Current estimated 90 Day market value of security/i
    );
    expect(inputElement).toBeDefined();
  });

  it('Input "Estimated 90 Day GDV" is rendered correctly', () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = getComponentWithRedux(
      SecurityDetailsForm,
      {
        ...defaultProps,
        finalizeStep,
      },
      {
        dip: {
          securities: [
            {
              SecurityInitialEstimation: "12.00",
            },
          ],
          AdvanceType: "multiple",
        },
      }
    );

    const inputElement = getByLabelText(/Estimated 90 Day GDV/i);
    expect(inputElement).toBeDefined();
  });
});
