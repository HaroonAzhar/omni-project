import { fireEvent, act, wait, within } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import Form5 from "../forms/form_5";

describe("<SecurityDetailsForm5>", () => {
  it("Pass step correctly", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByText, getAllByRole } = getComponentWithRedux(
      Form5,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          properties: [{}],
        },
      }
    );

    const fieldsetElements = getAllByRole("group");

    fieldsetElements.forEach((element) => {
      const yesLabel = within(element).getByLabelText(/Yes/i);

      act(() => {
        fireEvent.click(yesLabel);
      });
    });

    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          details: {
            is_new_build: true,
            is_planning_required: true,
            is_standard_construction: true,
          },
        },
      });
    });
  });
});
