import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";

import SecuritiesHomeScreen from "../security_details_home_screen";

describe("<SecurityDetailsHomeScree>", () => {
  beforeAll(() => {
    setupGoogleApiMock();
  });
  const renderComponent = () =>
    getComponentWithRedux(
      SecuritiesHomeScreen,
      {},
      {
        application: {
          properties: [{}, {}],
        },
      }
    );
  it("No delete button", async () => {
    const { queryAllByText } = renderComponent();

    const deleteButtons = queryAllByText(/Delete/i);

    expect(deleteButtons.length).toBe(0);
  });

  it("No Add button", async () => {
    const { queryAllByText } = renderComponent();

    const addButton = queryAllByText(/Add another property/i);

    expect(addButton.length).toBe(0);
  });
});
