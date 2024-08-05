import { fireEvent, act, wait } from "@testing-library/react";

import { setupGoogleApiMock, getComponentWithRedux } from "test_helpers";

import Form4 from "../forms/form_4";

const testingAddress = {
  address_line_1: "testing address 1",
  address_line_2: "testing address 2",
  city: "testing town",
  country: "united kingdom",
  postcode: "testing postcode",
  how_long_here_years: "3",
  how_long_here_months: "1",
};

describe("<ApplicantDetails>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });

  it("Load address from store to inputs", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = getComponentWithRedux(
      Form4,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [{ addresses: [testingAddress] }],
        },
      }
    );

    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const postcode = getByLabelText(/Postcode/i);
    const country = getByLabelText(/Country/i);

    expect(addressLine1.value).toBe(testingAddress.address_line_1);
    expect(addressLine2.value).toBe(testingAddress.address_line_2);
    expect(townCity.value).toBe(testingAddress.city);
    expect(country.value).toBe(testingAddress.country);
    expect(postcode.value).toBe(testingAddress.postcode);
  });

  it("Should fail time at address validation if the number of years adds up to less than 3", async () => {
    const finalizeStep = jest.fn(() => {});

    const {
      getAllByText,
      getByLabelText,
      getByText,
      queryByText,
    } = getComponentWithRedux(
      Form4,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [{ addresses: [{}] }],
        },
      }
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const continueButton = getByText(/^Continue/i);
    const addressLine1 = getByLabelText(/Address Line 1/i);
    const townCity = getByLabelText(/Town\/City/i);
    const postcode = getByLabelText(/Postcode/i);
    const country = getByLabelText(/Country/i);
    const yearsAtAddress = getByLabelText(/Time at this address - Years/i);

    act(() => {
      fireEvent.change(addressLine1, {
        target: { value: testingAddress.address_line_1 },
      });
      fireEvent.change(townCity, {
        target: { value: testingAddress.city },
      });
      fireEvent.change(postcode, {
        target: { value: testingAddress.postcode },
      });
      fireEvent.change(country, {
        target: { value: testingAddress.country },
      });
      fireEvent.change(yearsAtAddress, {
        target: { value: 2 },
      });
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    act(() => {
      const validationMessage = queryByText(/.*3 years.*/i);
      expect(validationMessage).not.toBeNull();
    });
  });

  it("Should pass time at address validation if the number of years is 3", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getAllByText, getByLabelText, getByText } = getComponentWithRedux(
      Form4,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [{ addresses: [{}] }],
        },
      }
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const continueButton = getByText(/^Continue/i);
    const addressLine1 = getByLabelText(/Address Line 1/i);
    const townCity = getByLabelText(/Town\/City/i);
    const postcode = getByLabelText(/Postcode/i);
    const country = getByLabelText(/Country/i);
    const yearsAtAddress = getByLabelText(/Time at this address - Years/i);
    const monthsAtAddress = getByLabelText(/Time at this address - Months/i);

    act(() => {
      fireEvent.change(addressLine1, {
        target: { value: testingAddress.address_line_1 },
      });
      fireEvent.change(townCity, {
        target: { value: testingAddress.city },
      });
      fireEvent.change(postcode, {
        target: { value: testingAddress.postcode },
      });
      fireEvent.change(country, {
        target: { value: testingAddress.country },
      });
      fireEvent.change(yearsAtAddress, {
        target: { value: 3 },
      });
      fireEvent.change(monthsAtAddress, {
        target: { value: 1 },
      });
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);
    });
  });

  it("Should be able to pass step with filled address inputs after enter address in the autocomplete", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getAllByText, getByLabelText, getByText } = getComponentWithRedux(
      Form4,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [{ addresses: [{}] }],
        },
      }
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const continueButton = getByText(/^Continue/i);
    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const postcode = getByLabelText(/Postcode/i);
    const country = getByLabelText(/Country/i);
    const yearsAtAddress = getByLabelText(/Time at this address - Years/i);
    const monthsAtAddress = getByLabelText(/Time at this address - Months/i);

    act(() => {
      fireEvent.change(monthsAtAddress, {
        target: { value: testingAddress.how_long_here_months },
      });
      fireEvent.change(yearsAtAddress, {
        target: { value: testingAddress.how_long_here_years },
      });
      fireEvent.change(addressLine1, {
        target: { value: testingAddress.address_line_1 },
      });
      fireEvent.change(addressLine2, {
        target: { value: testingAddress.address_line_2 },
      });
      fireEvent.change(townCity, {
        target: { value: testingAddress.city },
      });
      fireEvent.change(postcode, {
        target: { value: testingAddress.postcode },
      });
      fireEvent.change(country, {
        target: { value: testingAddress.country },
      });
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          addresses: [testingAddress],
        },
      });
    });
  });
});
