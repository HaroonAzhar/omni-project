import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import Form2 from "../form_2";

describe("<IntroducerDetails Form2>", () => {
  const renderForm = (finalizeStep, storeContent) =>
    getComponentWithRedux(
      Form2,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        ...storeContent,
      }
    );
  it("Question input handle boolean value", async () => {
    const finalizeStep = jest.fn(() => {});

    const { container, getByText } = renderForm(finalizeStep, {
      application: {
        introducer_details: {},
      },
    });

    const hasDualNationality = container.querySelector(
      "input[name='have_met_client'][value=true]"
    );

    act(() => {
      fireEvent.click(hasDualNationality);
      fireEvent.click(getByText(/Continue/i));
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          have_met_client: true,
        },
      });
    });
  });

  it("Uses the dip value for broker email", async () => {
    const finalizeStep = jest.fn(() => {});

    const dipMail = "dip_mail";

    const { getByText } = renderForm(finalizeStep, {
      application: {
        introducer_details: {
          email: "application_main",
        },
        broker_email: dipMail,
      },
    });

    act(() => {
      fireEvent.click(getByText(/Continue/i));
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          email: dipMail,
        },
      });
    });
  });

  it("Email field is disabled", async () => {
    const finalizeStep = jest.fn(() => {});

    const { getByLabelText } = renderForm(finalizeStep, {
      application: {},
    });

    const emailField = getByLabelText(/Email/i);

    expect(emailField.disabled).toBe(true);
  });
});
