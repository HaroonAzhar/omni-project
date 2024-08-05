import { fireEvent, act, wait } from "@testing-library/react";

import {
  setupGoogleApiMock,
  getComponentWithRedux,
  checkIfAddressInputsAreRendered,
  searchAndClickSelectedAddress,
} from "test_helpers";
import { mockPostcoder } from "test_helpers/mocks";

import Form3 from "../forms/form_3";
import Form6 from "../forms/form_6";

const companyStore = {
  company_number: "DIP_ID",
  company_name: "DIP name",
  companyData: {
    base_data: {
      nature_of_business: "EXAMPLE_NATURE",
      trading_since: "1",
      company_number: "EXAMPLE_ID",
    },
    address: {
      is_correspondence_same: false,
      registered: {},
      correspondence: {},
    },
  },
};

describe("<CompanyDetails>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
    mockPostcoder();
  });

  it("Should be able to pass step with filled address inputs after enter address in the autocomplete", async () => {
    const finalizeStep = jest.setTimeout(15000).fn(() => {});

    const {
      getByText,
      getAllByLabelText,
      getAllByText,
    } = getComponentWithRedux(
      Form3,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: companyStore,
      }
    );

    const searchButton = getAllByText(/Use search/i);

    act(() => {
      searchButton.forEach((useSearch) => fireEvent.click(useSearch));
    });

    const continueButton = getByText(/Continue/i);
    const searchInputs = getAllByLabelText(/Search address/i);
    const searchButtons = getAllByText(/Find address/i);

    act(() => {
      searchInputs.forEach((searchInput) =>
        fireEvent.change(searchInput, { target: { value: "foo" } })
      );
    });

    act(() => {
      searchButtons.forEach((button) => fireEvent.click(button));
    });

    await wait(() => {
      const selectedAddresses = getAllByText(
        /East Anglias Childrens Hospices, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ/i
      );

      act(() => {
        selectedAddresses.forEach((selection) => fireEvent.click(selection));
      });
    });

    await wait(() => checkIfAddressInputsAreRendered(getAllByLabelText));

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);
    });

    expect(finalizeStep).toBeCalledWith({
      data: {
        address: {
          registered: {
            address_line_1: "East Anglias Childrens Hospices",
            address_line_2: "Manor Farm Barns, Fox Road, Framingham Pigot",
            city: "Norwich",
            country: "united kingdom",
            postcode: "NR14 7PZ",
          },
          is_correspondence_same: false,
          correspondence: {
            address_line_1: "East Anglias Childrens Hospices",
            address_line_2: "Manor Farm Barns, Fox Road, Framingham Pigot",
            city: "Norwich",
            country: "united kingdom",
            postcode: "NR14 7PZ",
          },
        },
        base_data: {
          company_number: "DIP_ID",
          nature_of_business: "EXAMPLE_NATURE",
          trading_since: "1",
          name: "DIP name",
        },
        type_of_applicant: "company",
      },
      step_id: "company_details_form",
    });
  });

  it("Should be able to pass 6th step with complete data", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText, getByText } = getComponentWithRedux(
      Form6,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: companyStore,
      }
    );

    const accountantNameInput = getByLabelText(/Company accountant name/i);
    const accountantSurnameInput = getByLabelText(
      /Company accountant surname/i
    );
    const qualificationInput = getByLabelText(/Qualification/i);
    const continueButton = getByText(/Continue/i);

    await searchAndClickSelectedAddress(getByText, getByLabelText);

    act(() => {
      fireEvent.change(accountantNameInput, {
        target: { value: "Testing Name" },
      });

      fireEvent.change(accountantSurnameInput, {
        target: { value: "Testing Surname" },
      });

      fireEvent.change(qualificationInput, {
        target: { value: "Testing Qualification" },
      });
    });

    await wait(() => checkIfAddressInputsAreRendered(getByLabelText));

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          accountant: {
            address: {
              address_line_1: "Allies Computing Ltd",
              address_line_2: "Manor Farm Barns, Fox Road, Framingham Pigot",
              city: "Norwich",
              country: "united kingdom",
              postcode: "NR14 7PZ",
            },
            name: "Testing Name",
            qualification: "Testing Qualification",
            surname: "Testing Surname",
          },
          type_of_applicant: "company",
        },
        step_id: "company_details_form",
      });
    });
  });
});
