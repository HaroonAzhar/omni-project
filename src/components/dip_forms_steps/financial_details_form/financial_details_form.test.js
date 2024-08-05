import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import FinancialDetailsForm from "./index";

describe("<FinancialDetailsForm>", () => {
  it("Max LTGDV input is shown on multiple drawdown", async () => {
    const onSubmit = jest.fn(() => {});

    const { getByLabelText } = getComponentWithRedux(
      FinancialDetailsForm,
      { finalizeStep: onSubmit, goStepBack: () => {} },
      {
        dip: {
          AdvanceType: "multiple",
        },
        flow: {},
      }
    );

    const maxLtgdvInput = getByLabelText(/Max LTGDV/i);

    expect(maxLtgdvInput).toBeDefined();
  });

  it("Max LTGDV is require to continue.", async () => {
    const onSubmit = jest.fn(() => {});

    const { getByLabelText, getByText } = getComponentWithRedux(
      FinancialDetailsForm,
      { finalizeStep: onSubmit, goStepBack: () => {} },
      {
        dip: {
          AdvanceType: "multiple",
          MaxLtvDayOne: 50,
          FurtherDrawDowns: 50,
          BuildPeriodMonths: 4,
        },
        flow: {},
      }
    );

    const continueButton = getByText(/Continue/i);
    const maxLtgdvInput = getByLabelText(/Max LTGDV/i);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => expect(onSubmit).toBeCalledTimes(0));

    act(() => {
      fireEvent.change(maxLtgdvInput, { target: { value: 80 } });
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => expect(onSubmit).toBeCalledTimes(1));
  });
});
