import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form4 from "../form_4";

describe("ValuationReport Form 4", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });

  const renderWithFinalize = (finalizeStep) =>
    getComponentWithRedux(
      Form4,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          properties: [{ details: {}, address: {} }],
        },
      }
    );

  it("Saves newly added fields", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByText, getAllByLabelText } = renderWithFinalize(finalizeStep);

    const nextButton = getByText(/Next/i);

    const yesOptions = getAllByLabelText(/Yes/i);

    for (const yesOption of yesOptions) {
      act(() => {
        fireEvent.click(yesOption);
      });
    }
    act(() => {
      fireEvent.click(nextButton);
    });
    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledWith({
        data: {
          listed_grade: true,
          anob: true,
          country: "united kingdom",
          flood_zone: true,
          green_belt: true,
          nitrate_neutrality: true,
          planning_required: true,
          sang: true,
          sssi: true,
          esw1: true,
        },
      });
    });
  });

  it("Saves planning reference numbers", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByText, getAllByLabelText } = renderWithFinalize(finalizeStep);

    const addButton = getByText(/Add Planning Reference/i);
    const nextButton = getByText(/Next/i);

    act(() => {
      fireEvent.click(addButton);
    });

    const planningReferenceNumbers = getAllByLabelText(
      /Planning Reference number/i
    );

    expect(planningReferenceNumbers.length).toBe(1);

    const [planningReferenceNumber] = planningReferenceNumbers;

    act(() => {
      fireEvent.change(planningReferenceNumber, { target: { value: 11 } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledWith({
        data: {
          planning_reference_numbers: ["11"],
          country: "united kingdom",
        },
      });
    });
  });
});
