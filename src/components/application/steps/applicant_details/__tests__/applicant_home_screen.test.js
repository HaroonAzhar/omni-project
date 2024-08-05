import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import ApplicantsHomeScreen from "../home_screen";

describe("ApplicantsHomeScree>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });

  const renderComponent = (type_of_applicant) =>
    getComponentWithRedux(
      ApplicantsHomeScreen,
      {},
      {
        application: {
          individuals: [{ personal_data: {} }, { personal_data: {} }],
          type_of_applicant,
        },
      }
    );

  it("No delete button for individual", async () => {
    const { queryAllByText } = renderComponent("individual");

    const deleteButtons = queryAllByText(/Delete/i);

    expect(deleteButtons.length).toBe(0);
  });

  it("Delete button for company", async () => {
    const { queryAllByText } = renderComponent("company");

    const deleteButtons = queryAllByText(/Delete/i);

    expect(deleteButtons.length).toBe(2);
  });

  it("No Add button for individuals", async () => {
    const { queryAllByText } = renderComponent("individual");

    const addButton = queryAllByText(/Add another Applicant/i);

    expect(addButton.length).toBe(0);
  });

  it("Add button for company", async () => {
    const { queryAllByText } = renderComponent("company");

    const addButton = queryAllByText(/Add another Director\/Shareholder/i);

    expect(addButton.length).toBe(1);
  });
});
