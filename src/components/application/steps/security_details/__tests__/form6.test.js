import { fireEvent, act, wait } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { getComponentWithRedux } from "test_helpers";
import { apiAxiosInstance } from "utils/requests/api";
import { APPLICANT_OF_CASE } from "utils/urls";

import individualsResponse from "./individuals_response";
import getInputElements from "./get_contact_details_inputs";
import Form6 from "../forms/form_6";

const mock = new MockAdapter(apiAxiosInstance);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: 123 }),
}));

const renderForm = async ({
  isPaymentSameAsAccess = false,
  store = { application: { properties: [] } },
}) => {
  const finalizeStep = jest.fn(() => {});

  const individualEndpoint = jest.fn(() => [200, individualsResponse]);
  mock.onGet(APPLICANT_OF_CASE(123)).reply(individualEndpoint);

  const { container, getByText } = getComponentWithRedux(
    Form6,
    {
      finalizeStep,
      goStepBack: () => {},
    },
    store
  );

  const getContactDetailsRadioButton = () =>
    container.querySelector(
      `[name="details.payment_contact_details_same_as_access_valuation"][value=${isPaymentSameAsAccess}]`
    );

  act(() => {
    fireEvent.click(getContactDetailsRadioButton(isPaymentSameAsAccess));
  });

  return {
    accessContactDetails: getInputElements(container, "access"),
    paymentContactDetails: getInputElements(container, "payment"),
    saveButton: getByText(/Save/i),
    mockedFinalizeStep: finalizeStep,
  };
};

describe("Form6 of <SecurityDetails>", () => {
  it("Shows contact inputs when payment isn't the same as access", async () => {
    const { paymentContactDetails } = await renderForm({
      isPaymentSameAsAccess: false,
    });

    const { nameElement, emailElement, phoneElement } = paymentContactDetails;

    expect(nameElement).toBeInstanceOf(HTMLInputElement);
    expect(emailElement).toBeInstanceOf(HTMLInputElement);
    expect(phoneElement).toBeInstanceOf(HTMLInputElement);
  });

  it("Doesn't show contact inputs when payment is the same as access", async () => {
    const { paymentContactDetails } = await renderForm({
      isPaymentSameAsAccess: true,
    });

    expect(paymentContactDetails.nameElement).toBe(null);
    expect(paymentContactDetails.emailElement).toBe(null);
    expect(paymentContactDetails.phoneElement).toBe(null);
  });

  it("Get a correct contact data while same as access selected", async () => {
    const {
      accessContactDetails,
      saveButton,
      mockedFinalizeStep,
    } = await renderForm({
      isPaymentSameAsAccess: true,
    });

    act(() => {
      fireEvent.change(accessContactDetails.nameElement, {
        target: { value: "TestingName" },
      });
      fireEvent.change(accessContactDetails.emailElement, {
        target: { value: "email@test.com" },
      });
      fireEvent.change(accessContactDetails.phoneElement, {
        target: { value: "+123 123 123" },
      });
      fireEvent.click(saveButton);
    });

    await wait(() => {
      expect(mockedFinalizeStep).toHaveBeenCalledTimes(1);

      expect(mockedFinalizeStep).toBeCalledWith({
        data: {
          details: {
            contact_for_access_valuation_name: "TestingName",
            contact_for_access_valuation_email: "email@test.com",
            contact_for_access_valuation_phone: "+123 123 123",
            is_occupied: undefined,
            is_occupied_by_borrower: undefined,
            selected_contact_for_access_valuation: "manual",
            selected_contact_for_payment_valuation: "manual",
            payment_contact_details_same_as_access_valuation: true,
          },
        },
      });
    });
  });

  it("Get a correct contact data while payment isn't same as access", async () => {
    const {
      accessContactDetails,
      paymentContactDetails,
      saveButton,
      mockedFinalizeStep,
    } = await renderForm({
      isPaymentSameAsAccess: false,
    });

    act(() => {
      fireEvent.change(accessContactDetails.nameElement, {
        target: { value: "Testing Name" },
      });
      fireEvent.change(accessContactDetails.emailElement, {
        target: { value: "email@test.com" },
      });
      fireEvent.change(accessContactDetails.phoneElement, {
        target: { value: "+123 123 123" },
      });

      fireEvent.change(paymentContactDetails.nameElement, {
        target: { value: "Second Testing Name" },
      });
      fireEvent.change(paymentContactDetails.emailElement, {
        target: { value: "email2@test2.com" },
      });
      fireEvent.change(paymentContactDetails.phoneElement, {
        target: { value: "+321 321 321" },
      });

      fireEvent.click(saveButton);
    });

    await wait(() => {
      expect(mockedFinalizeStep).toHaveBeenCalledTimes(1);

      expect(mockedFinalizeStep).toBeCalledWith({
        data: {
          details: {
            contact_for_access_valuation_name: "Testing Name",
            contact_for_access_valuation_email: "email@test.com",
            contact_for_access_valuation_phone: "+123 123 123",

            contact_for_payment_valuation_name: "Second Testing Name",
            contact_for_payment_valuation_email: "email2@test2.com",
            contact_for_payment_valuation_phone: "+321 321 321",

            selected_contact_for_access_valuation: "manual",
            selected_contact_for_payment_valuation: "manual",

            is_occupied: undefined,
            is_occupied_by_borrower: undefined,
            payment_contact_details_same_as_access_valuation: false,
          },
        },
      });
    });
  });

  it("Read applicant contact details from store properly", async () => {
    const store = {
      application: {
        properties: [
          {
            id: 1033,
            valuation_report: {},
            details: {
              being_purchased: true,
              current_value: 12,
              value_after_works: 123,
              purchase_price: 1,
              security_type: "commercial",
              contact_for_access_valuation_name: "",
              contact_for_access_valuation_phone: "",
              contact_for_access_valuation_email: "",
              selected_contact_for_access_valuation: "applicant",
              selected_contact_for_payment_valuation: "manual",
              selected_contact_applicant_id_for_access_valuation: "1",
              payment_contact_details_same_as_access_valuation: true,
            },
            address: {
              line_1: "12, Shrigley Road North",
              line_2: "Cheshire East, England",
              postcode: "SK12 1TE",
              city: "Stockport",
              country: "Wielka Brytania",
            },
            charge: {
              opfl_charge_type: "first_charge",
              lenders: [{}],
            },
          },
        ],
      },
    };

    const { accessContactDetails } = await renderForm({
      isPaymentSameAsAccess: false,
      store,
    });

    await wait(() => {
      expect(accessContactDetails.nameElement.value).toBe(
        "forename a surname a"
      );
      expect(accessContactDetails.emailElement.value).toBe("email@test.com");
      expect(accessContactDetails.phoneElement.value).toBe("+333 333 333");
    });
  });

  it("Show and save correct contact data for introducer in inputs", async () => {
    const store = {
      application: {
        properties: [],
        introducer_details: {
          firm: "brokerCompany",
          introducer: "brokerName",
          address_line_1: "Testing Line",
          address_line_2: "Testing Line2",
          city: "Testing",
          postcode: "N8",
          country: "united kingdom",
          phone_number: "+111 111 111",
          email: "broker@test.com",
        },
        type_of_introducer: "via_broker",
      },
    };

    const {
      accessContactDetails,
      saveButton,
      mockedFinalizeStep,
    } = await renderForm({
      isPaymentSameAsAccess: false,
      store,
    });

    act(() => {
      fireEvent.change(accessContactDetails.contactDropdown, {
        target: { value: "introducer" },
      });
    });

    expect(accessContactDetails.emailElement.value).toBe("broker@test.com");
    expect(accessContactDetails.nameElement.value).toBe("brokerName");
    expect(accessContactDetails.phoneElement.value).toBe("+111 111 111");

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(mockedFinalizeStep).toHaveBeenCalledTimes(1);
    expect(mockedFinalizeStep).toBeCalledWith({
      data: {
        details: {
          contact_for_access_valuation_email: "broker@test.com",
          contact_for_access_valuation_name: "brokerName",
          contact_for_access_valuation_phone: "+111 111 111",
          is_occupied: undefined,
          is_occupied_by_borrower: undefined,
          payment_contact_details_same_as_access_valuation: false,
          selected_contact_for_access_valuation: "introducer",
          selected_contact_for_payment_valuation: "manual",
        },
      },
    });
  });

  it("Get and save a correct applicant access contact data", async () => {
    const {
      accessContactDetails,
      mockedFinalizeStep,
      saveButton,
    } = await renderForm({
      isPaymentSameAsAccess: false,
    });

    await wait(() => {
      act(() => {
        fireEvent.change(accessContactDetails.contactDropdown, {
          target: { value: "1" },
        });
      });
      expect(accessContactDetails.nameElement.value).toBe(
        "forename a surname a"
      );
      expect(accessContactDetails.emailElement.value).toBe("email@test.com");
      expect(accessContactDetails.phoneElement.value).toBe("+333 333 333");
    });

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(mockedFinalizeStep).toHaveBeenCalledTimes(1);
    expect(mockedFinalizeStep).toBeCalledWith({
      data: {
        details: {
          contact_for_access_valuation_email: "email@test.com",
          contact_for_access_valuation_name: "forename a surname a",
          contact_for_access_valuation_phone: "+333 333 333",
          is_occupied: undefined,
          is_occupied_by_borrower: undefined,
          payment_contact_details_same_as_access_valuation: false,
          selected_contact_for_payment_valuation: "manual",
          selected_contact_for_access_valuation: "applicant",
          selected_contact_applicant_id_for_access_valuation: "1",
        },
      },
    });
  });

  it("Get and save a correct applicant payment contact data", async () => {
    const {
      paymentContactDetails,
      mockedFinalizeStep,
      saveButton,
    } = await renderForm({
      isPaymentSameAsAccess: false,
    });

    await wait(() => {
      act(() => {
        fireEvent.change(paymentContactDetails.contactDropdown, {
          target: { value: "2" },
        });
      });

      expect(paymentContactDetails.nameElement.value).toBe(
        "forename b surname b"
      );
      expect(paymentContactDetails.emailElement.value).toBe("email2@test.com");
      expect(paymentContactDetails.phoneElement.value).toBe("+444 444 444");
    });

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(mockedFinalizeStep).toHaveBeenCalledTimes(1);
    expect(mockedFinalizeStep).toBeCalledWith({
      data: {
        details: {
          contact_for_payment_valuation_email: "email2@test.com",
          contact_for_payment_valuation_name: "forename b surname b",
          contact_for_payment_valuation_phone: "+444 444 444",
          is_occupied: undefined,
          is_occupied_by_borrower: undefined,
          payment_contact_details_same_as_access_valuation: false,
          selected_contact_for_access_valuation: "manual",
          selected_contact_for_payment_valuation: "applicant",
          selected_contact_applicant_id_for_payment_valuation: "2",
        },
      },
    });
  });

  it("Skip validation on applicant - random values", async () => {
    const {
      paymentContactDetails,
      mockedFinalizeStep,
      saveButton,
    } = await renderForm({
      isPaymentSameAsAccess: false,
      store: {
        application: { properties: [], type_of_introducer: "via_broker" },
      },
    });

    await wait(() => {
      act(() => {
        fireEvent.change(paymentContactDetails.contactDropdown, {
          target: { value: "introducer" },
        });
      });
    });

    act(() => {
      fireEvent.change(paymentContactDetails.nameElement, {
        target: { value: "random value 123" },
      });
      fireEvent.change(paymentContactDetails.emailElement, {
        target: { value: "random value 123" },
      });
      fireEvent.change(paymentContactDetails.phoneElement, {
        target: { value: "random value 123" },
      });

      fireEvent.click(saveButton);
    });

    expect(mockedFinalizeStep).toBeCalledWith({
      data: {
        details: {
          contact_for_payment_valuation_email: "random value 123",
          contact_for_payment_valuation_name: "random value 123",
          contact_for_payment_valuation_phone: "random value 123",
          payment_contact_details_same_as_access_valuation: false,
          selected_contact_for_access_valuation: "manual",
          selected_contact_for_payment_valuation: "introducer",
        },
      },
    });
  });

  it("Skip validation on applicant - empty values", async () => {
    const {
      paymentContactDetails,
      mockedFinalizeStep,
      saveButton,
    } = await renderForm({
      isPaymentSameAsAccess: false,
      store: {
        application: { properties: [], type_of_introducer: "via_broker" },
      },
    });

    await wait(() => {
      act(() => {
        fireEvent.change(paymentContactDetails.contactDropdown, {
          target: { value: "introducer" },
        });
      });
    });

    expect(paymentContactDetails.nameElement.value).toBe("");
    expect(paymentContactDetails.emailElement.value).toBe("");
    expect(paymentContactDetails.phoneElement.value).toBe("");

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(mockedFinalizeStep).toBeCalledWith({
      data: {
        details: {
          payment_contact_details_same_as_access_valuation: false,
          selected_contact_for_access_valuation: "manual",
          selected_contact_for_payment_valuation: "introducer",
        },
      },
    });
  });
});
