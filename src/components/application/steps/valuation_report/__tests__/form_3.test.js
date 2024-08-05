import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form3 from "../form_3";

describe("ValuationReport Form 3", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });
  const renderWithFinalize = (finalizeStep, building_type) =>
    getComponentWithRedux(
      Form3,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          properties: [{ details: {} }],
          building_type,
        },
      }
    );
  it("Can go past step 3 for non development loans", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getByText } = renderWithFinalize(finalizeStep, "non_development");

    const nextButton = getByText(/Next/i);

    act(() => {
      fireEvent.click(nextButton);
    });
    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);
    });
  });
});
