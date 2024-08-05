import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form4 from "../forms/form_4";

describe("<SecurityDetailsForm3>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });
  const details = {
    charge: "first",
  };
  const properties = [
    {
      details,
    },
  ];

  const renderWithFinalize = (finalizeStep) =>
    getComponentWithRedux(
      Form4,
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

  it("Security type is disabled", async () => {
    const finalizeStep = jest.fn(() => {});
    const { container } = renderWithFinalize(finalizeStep);

    const securityTypeOptions = [
      "residential",
      "commercial",
      "land",
      `semi_commercial`,
      "development",
      `office_block`,
      `airspace_development`,
      "other",
    ];

    for (const securityTypeOption of securityTypeOptions) {
      const option = container.querySelector(
        `input[name='details.security_type'][value=${securityTypeOption}]`
      );
      expect(option.disabled).toBe(true);
    }
  });
});
