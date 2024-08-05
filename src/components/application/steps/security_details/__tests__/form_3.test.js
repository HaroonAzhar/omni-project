import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form3 from "../forms/form_3";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({
    indexOfElement: 0,
  }),
}));

describe("<SecurityDetailsForm3>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });

  const details = {
    charge: {
      lenders: [{}],
      opfl_charge_type: "first_charge",
      security_owner: "third_party",
      security_owner_title: "Miss",
    },
  };

  const properties = [
    {
      details,
    },
  ];

  const renderWithFinalize = (finalizeStep) =>
    getComponentWithRedux(
      Form3,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          properties,
        },
      }
    );

  it("Fill property charge with charge from redux", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByText } = renderWithFinalize(finalizeStep);

    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toBeCalledWith({
        data: properties[0],
      });
    });
  });

  it("Charge type is disabled", async () => {
    const finalizeStep = jest.fn(() => {});
    const { container } = renderWithFinalize(finalizeStep);

    const firstCharge = container.querySelector(
      "input[name='charge.opfl_charge_type'][value=first_charge]"
    );
    expect(firstCharge.disabled).toBe(true);

    const secondCharge = container.querySelector(
      "input[name='charge.opfl_charge_type'][value=second_charge]"
    );
    expect(secondCharge.disabled).toBe(true);
  });

  it("Renders inputs when Security Owner is 3rd party", async () => {
    const finalizeStep = jest.fn(() => {});
    const { container, getByLabelText } = renderWithFinalize(finalizeStep);

    const thirdPartyRadio = container.querySelector(
      "input[name='charge.security_owner'][value=third_party]"
    );

    act(() => {
      fireEvent.click(thirdPartyRadio);
    });

    getByLabelText(/Title/i);
    getByLabelText(/Forename/i);
    getByLabelText(/Middle name\(s\)/i);
    getByLabelText(/Surname/i);
  });
});
