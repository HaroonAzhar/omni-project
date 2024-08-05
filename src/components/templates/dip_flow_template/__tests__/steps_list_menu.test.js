import { getComponentWithRedux } from "test_helpers";

import StepsListMenu from "../steps_list_menu";

const initialStore = {
  dip: {},
  ui: {},
};

const stepsWithNames = [
  { stepName: "first", stepIndex: 0 },
  { stepName: "second", stepIndex: 1 },
  { stepName: "third", stepIndex: 2 },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteMatch: jest.fn().mockReturnValue({
    path: "/dip/:id/:indexOfStep",
    params: {
      id: "123",
      indexOfStep: 0,
    },
  }),
}));

describe("<StepsListMenu>", () => {
  it("Renders list of steps correctly", () => {
    const { getByText } = getComponentWithRedux(
      StepsListMenu,
      {
        stepsWithNames,
        currentStepNameIndex: 0,
      },
      initialStore
    );

    getByText(/first/i);
    getByText(/second/i);
    getByText(/third/i);
  });

  it("Sets href in menu elements", () => {
    const { container } = getComponentWithRedux(
      StepsListMenu,
      {
        canNavigateToAll: true,
        stepsWithNames,
        currentStepNameIndex: 0,
      },
      initialStore
    );

    const elements = container.querySelectorAll("li > a");

    elements.forEach((item, index) => {
      expect(item.href).toBe(`http://localhost/dip/123/${index}`);
    });
  });

  it("Steps before current step have links", () => {
    const { container } = getComponentWithRedux(
      StepsListMenu,
      {
        canNavigateToAll: false,
        stepsWithNames,
        currentStepNameIndex: 0,
        savedSteps: [{ Name: "first" }],
      },
      initialStore
    );

    const elements = container.querySelectorAll("li > a");
    expect(elements.length).toBe(2);
  });
});
