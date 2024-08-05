import { fireEvent, act, wait } from "@testing-library/react";

import {
  setupGoogleApiMock,
  getComponentWithRedux,
  checkIfAddressInputsAreRendered,
  searchAndClickSelectedAddress,
} from "test_helpers";
import { mockPostcoder } from "test_helpers/mocks";

import Form1 from "../form_1";

describe("Application <IntroducerDetails>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
    mockPostcoder();
  });

  const renderForm = (finalizeStep, storeContent) =>
    getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        ...storeContent,
      }
    );

  it("First step is finalizing correctly with complete data", async () => {
    const finalizeStep = jest.setTimeout(15000).fn(() => {});

    const { getByLabelText, getByText } = renderForm(finalizeStep, {
      application: {
        introducer_details: {},
      },
    });

    const firmInput = getByLabelText(/Firm/i);
    const introducerInput = getByLabelText(/Introducer/i);
    const phoneInput = getByLabelText(/Phone number/i);

    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.change(firmInput, {
        target: { value: "testing firm" },
      });

      fireEvent.change(introducerInput, {
        target: { value: "testing introducer" },
      });

      fireEvent.change(phoneInput, {
        target: { value: "+123 123 123" },
      });
    });

    await searchAndClickSelectedAddress(getByText, getByLabelText);

    await wait(() => checkIfAddressInputsAreRendered(getByLabelText));

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith(
        expect.objectContaining({
          data: {
            firm: "testing firm",
            introducer: "testing introducer",
            phone_number: "+123 123 123",
            city: "Norwich",
            country: "united kingdom",
            address_line_1: "Allies Computing Ltd",
            address_line_2: "Manor Farm Barns, Fox Road, Framingham Pigot",
            postcode: "NR14 7PZ",
          },
        })
      );
    });
  });

  it("Uses the dip value for broker name and firm", async () => {
    const finalizeStep = jest.fn(() => {});

    const dipBrokerName = "dipBrokerName";
    const dipBrokerCompanyName = "dipBrokerCompanyName";

    const { getByText } = renderForm(finalizeStep, {
      application: {
        introducer_details: {
          firm: "application_firm",
          introducer: "application_introducer",
        },
        broker_company_name: dipBrokerCompanyName,
        broker_name: dipBrokerName,
      },
    });

    act(() => {
      fireEvent.click(getByText(/Continue/i));
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          firm: dipBrokerCompanyName,
          introducer: dipBrokerName,
        },
      });
    });
  });

  it("Introducer and firm fields are disabled", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = renderForm(finalizeStep, {
      application: {},
    });

    const introducerField = getByLabelText(/Introducer/i);

    expect(introducerField.disabled).toBe(true);

    const introducerFirmField = getByLabelText(/Firm/i);

    expect(introducerFirmField.disabled).toBe(true);
  });
});
