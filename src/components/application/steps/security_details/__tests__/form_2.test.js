import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form2 from "../forms/form_2";

describe("<SecurityDetailsForm2>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });
  const renderWithFinalize = (finalizeStep) =>
    getComponentWithRedux(
      Form2,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          properties: [],
        },
      }
    );
  it("Dip fields are disabled", async () => {
    const finalizeStep = jest.fn(() => {});
    const { container, getByLabelText } = renderWithFinalize(finalizeStep);

    const labels = [
      /Estimated current value/i,
      /Estimated value after work/i,
      /Purchase price/i,
    ];

    for (const label of labels) {
      expect(getByLabelText(label).disabled).toBe(true);
    }

    const beingPurchasedYes = container.querySelector(
      "input[name='details.being_purchased'][value=true]"
    );
    expect(beingPurchasedYes.disabled).toBe(true);

    const beingPurchasedNo = container.querySelector(
      "input[name='details.being_purchased'][value=false]"
    );
    expect(beingPurchasedNo.disabled).toBe(true);

    const alreadyOwnedYes = container.querySelector(
      "input[name='details.already_owned'][value=true]"
    );
    expect(alreadyOwnedYes.disabled).toBe(true);

    const alreadyOwnedNo = container.querySelector(
      "input[name='details.already_owned'][value=false]"
    );
    expect(alreadyOwnedNo.disabled).toBe(true);
  });
});
