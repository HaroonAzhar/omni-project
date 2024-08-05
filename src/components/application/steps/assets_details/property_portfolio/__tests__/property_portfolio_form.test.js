import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import PropertyPortfolioForm from "../property_portfolio_form";

const testingAddress = {
  address_line_1: "testing address 1",
  address_line_2: "testing address 2",
  city: "testing town",
  country: "united kingdom",
  postcode: "testing postcode",
};

describe("<PropertyPortfolioForm>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });

  it("Load address from store to inputs", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = getComponentWithRedux(
      PropertyPortfolioForm,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [
            {
              property_portfolio: [testingAddress],
            },
          ],
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

  it("Should be able to pass step with filled address inputs after enter address in the autocomplete", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getAllByText, getByLabelText, getByText } = getComponentWithRedux(
      PropertyPortfolioForm,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [{}],
        },
      }
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const continueButton = getByText(/Save/i);
    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const postcode = getByLabelText(/Postcode/i);
    const country = getByLabelText(/Country/i);

    act(() => {
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
          property_portfolio: [
            {
              ...testingAddress,
              is_where_resides: undefined,
            },
          ],
        },
      });
    });
  });

  const address = {
    address_line_1: "75, Bilton Way",
    address_line_2: "Greater London, England",
    city: "Enfield",
    country: "united kingdom",
    postcode: "EN3 7ER",
  };

  const defaultProps = {
    finalizeStep: () => {},
    goStepBack: () => {},
  };

  it("Fill property address with applicant address after select is where resides yes", async () => {
    const { getAllByText, getByLabelText } = getComponentWithRedux(
      PropertyPortfolioForm,
      defaultProps,
      {
        application: {
          individuals: [
            {
              addresses: [address],
            },
          ],
        },
      }
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const country = getByLabelText(/Country/i);
    const postCode = getByLabelText(/Postcode/i);

    const isWhereResidesYes = getByLabelText(/Yes/i);

    act(() => {
      fireEvent.click(isWhereResidesYes);
    });

    await wait(() => {
      expect(isWhereResidesYes.value).toBe("true");
      expect(addressLine1.value).toBe(address.address_line_1);
      expect(addressLine2.value).toBe(address.address_line_2);
      expect(townCity.value).toBe(address.city);
      expect(country.value).toBe(address.country);
      expect(postCode.value).toBe(address.postcode);
    });
  });

  it("Does not fill property address with applicant address after select is where resides no", async () => {
    const { getAllByText, getByLabelText, container } = getComponentWithRedux(
      PropertyPortfolioForm,
      defaultProps,
      {
        application: {
          individuals: [{ addresses: [] }],
        },
      }
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const country = getByLabelText(/Country/i);
    const postCode = getByLabelText(/Postcode/i);

    const isWhereResidesNo = container.querySelector(
      "input[name=is_where_resides][value=false]"
    );

    act(() => {
      fireEvent.click(isWhereResidesNo);
    });
    await wait(() => {
      expect(isWhereResidesNo.value).toBe("false");
      expect(addressLine1.value).toBe("");
      expect(addressLine2.value).toBe("");
      expect(townCity.value).toBe("");
      expect(country.value).toBe("united kingdom");
      expect(postCode.value).toBe("");
    });
  });

  it("Can change property address after select is where resides yes", async () => {
    const { getAllByText, getByLabelText } = getComponentWithRedux(
      PropertyPortfolioForm,
      defaultProps,
      {
        application: {
          individuals: [
            {
              addresses: [address],
            },
          ],
        },
      }
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const addressLine1 = getByLabelText(/Address Line 1/i);
    const addressLine2 = getByLabelText(/Address Line 2/i);
    const townCity = getByLabelText(/Town\/City/i);
    const country = getByLabelText(/Country/i);
    const postCode = getByLabelText(/Postcode/i);

    const isWhereResidesYes = getByLabelText(/Yes/i);

    act(() => {
      fireEvent.click(isWhereResidesYes);
    });
    await wait(() => {
      expect(isWhereResidesYes.value).toBe("true");
      expect(addressLine1.value).toBe(address.address_line_1);
      expect(addressLine2.value).toBe(address.address_line_2);
      expect(townCity.value).toBe(address.city);
      expect(country.value).toBe(address.country);
      expect(postCode.value).toBe(address.postcode);
    });

    const modifiedValue = "modified value";
    act(() => {
      fireEvent.change(townCity, {
        target: { value: modifiedValue },
      });
    });
    await wait(() => {
      expect(townCity.value).toBe(modifiedValue);
    });
  });

  it("Can save current debt higher than estimated value", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByText } = getComponentWithRedux(
      PropertyPortfolioForm,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [
            {
              property_portfolio: [{ current_debt: 2, estimated_value: 1 }],
            },
          ],
        },
      }
    );

    const continueButton = getByText(/Save/i);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          property_portfolio: [{ current_debt: 2, estimated_value: 1 }],
        },
      });
    });
  });
});
