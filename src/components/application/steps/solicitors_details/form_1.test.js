import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form1 from "./form_1";

describe("<SolicitorsDetails Form1>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });

  it("Pass step correctly", async () => {
    const finalizeStep = jest.setTimeout(15000).fn(() => {});

    const {
      container,
      getAllByText,
      getByLabelText,
      getByText,
    } = getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {},
      }
    );

    const areLeastTwoPartnersTrue = container.querySelector(
      "input[name='are_least_two_partners'][value=true]"
    );

    const searchButton = getAllByText(/Cancel Search/i);

    act(() => {
      fireEvent.click(areLeastTwoPartnersTrue);
    });
    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const companyNameInput = getByLabelText(/Solicitor firm name/i);

    const continueButton = getByText(/Continue/i);

    const line1Input = getByLabelText(/Address Line 1/i);
    const line2Input = getByLabelText(/Address Line 2/i);
    const townInput = getByLabelText(/Town\/City/i);
    const postcodeInput = getByLabelText(/Postcode/i);
    const phoneNumberInput = getByLabelText(/Telephone number/i);
    const emailInput = getByLabelText(/Email address/i);

    await wait(() => {
      expect(line1Input.disabled).toBe(false);
      expect(line2Input.disabled).toBe(false);
      expect(townInput.disabled).toBe(false);
      expect(postcodeInput.disabled).toBe(false);
      expect(phoneNumberInput.disabled).toBe(false);
      expect(emailInput.disabled).toBe(false);
      expect(continueButton.disabled).toBe(false);
    });

    act(() => {
      fireEvent.change(companyNameInput, {
        target: { value: "test company name" },
      });
      fireEvent.change(line1Input, { target: { value: "test address 1" } });
      fireEvent.change(line2Input, { target: { value: "test address 2" } });
      fireEvent.change(townInput, { target: { value: "testtown" } });
      fireEvent.change(postcodeInput, { target: { value: "SW1A 2AA" } });
      fireEvent.change(phoneNumberInput, {
        target: { value: "020 7946 0592" },
      });
      fireEvent.change(emailInput, { target: { value: "test@test.test" } });
    });

    await wait(() => {
      expect(continueButton.disabled).toBe(false);
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          address_line_1: "test address 1",
          address_line_2: "test address 2",
          city: "testtown",
          are_least_two_partners: true,
          country: "united kingdom",
          company_name: "test company name",
          postcode: "SW1A 2AA",
          phone_number: "020 7946 0592",
          email: "test@test.test",
        },
      });
    });
  });

  it("Prevent from proceeded", async () => {
    const finalizeStep = jest.fn(() => {});
    const { container, getByText } = getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          solicitor_details: {
            address_line_1: "test address 1",
            address_line_2: "test address 2",
            city: "testtown",
            country: "united kingdom",
            company_name: "test company name",
            postcode: "SW1A 2AA",
            contact_name: "testing name",
            phone_number: "020 7946 0592",
            email: "test@test.test",
          },
        },
      }
    );

    act(() => {
      const areLeastTwoPartnersFalse = container.querySelector(
        "input[name='are_least_two_partners'][value=false]"
      );

      fireEvent.click(areLeastTwoPartnersFalse);
      fireEvent.click(getByText(/Continue/i));
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(0);
    });
  });

  it("Can update all details", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByLabelText, getByText } = getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          solicitor_details: {
            address_line_1: "test address 1",
            address_line_2: "test address 2",
            city: "testtown",
            are_least_two_partners: true,
            country: "united kingdom",
            company_name: "test company name",
            postcode: "SW1A 2AA",
            phone_number: "020 7946 0592",
            email: "test@test.test",
          },
        },
      }
    );

    const companyNameInput = getByLabelText(/Solicitor firm name/i);

    const line1Input = getByLabelText(/Address Line 1/i);
    const line2Input = getByLabelText(/Address Line 2/i);
    const townInput = getByLabelText(/Town\/City/i);
    const postcodeInput = getByLabelText(/Postcode/i);
    const phoneNumberInput = getByLabelText(/Telephone number/i);
    const emailInput = getByLabelText(/Email address/i);

    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.change(companyNameInput, {
        target: { value: "test company name2" },
      });
      fireEvent.change(line1Input, { target: { value: "test address 12" } });
      fireEvent.change(line2Input, { target: { value: "test address 22" } });
      fireEvent.change(townInput, { target: { value: "testtown2" } });
      fireEvent.change(postcodeInput, { target: { value: "SW1A 2AB" } });
      fireEvent.change(phoneNumberInput, {
        target: { value: "020 7946 0593" },
      });
      fireEvent.change(emailInput, { target: { value: "test2@test.test" } });
    });

    await wait(() => {
      expect(continueButton.disabled).toBe(false);
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          address_line_1: "test address 12",
          address_line_2: "test address 22",
          city: "testtown2",
          are_least_two_partners: true,
          country: "united kingdom",
          company_name: "test company name2",
          postcode: "SW1A 2AB",
          phone_number: "020 7946 0593",
          email: "test2@test.test",
        },
      });
    });
  });
});
