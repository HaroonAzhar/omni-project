import { fireEvent, act } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import store from "./store.json";
import SummaryStep from "../index";

describe("<SummaryStep>", () => {
  it("Can finalize summary step", () => {
    const finalizeStep = jest.fn(() => {});

    const { getByText } = getComponentWithRedux(
      SummaryStep,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      store
    );

    const completeButton = getByText(/complete/i);
    act(() => {
      fireEvent.click(completeButton);
    });

    expect(finalizeStep).toHaveBeenCalledTimes(1);
  });
});
