import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import Form1 from "../form_1";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ indexOfElement: 1 }),
}));

describe("ValuationReport Form 1", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });

  const renderWithFinalize = (finalizeStep) =>
    getComponentWithRedux(
      Form1,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          properties: [
            { details: {}, address: {}, charge: {} },
            {
              valuation_report: {
                name_of_the_individual_surveyor:
                  "name of the individual surveyor",
              },
              details: {},
              address: {},
              charge: {},
            },
          ],
        },
      }
    );

  it("Shows values for the second valuation report", async () => {
    const finalizeStep = jest.fn(() => {});
    const { getAllByDisplayValue } = renderWithFinalize(finalizeStep);

    const surveyorField = getAllByDisplayValue(
      "name of the individual surveyor"
    );
    expect(surveyorField).toBeDefined();
  });
});
