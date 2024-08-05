import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";

import { WarningLabel } from "../labels";

const getComponent = (applicationSteps) => {
  return (
    <ThemeProvider theme={{ colors: { warn: "red", darkWarn: "blue" } }}>
      <WarningLabel applicationSteps={applicationSteps} />
    </ThemeProvider>
  );
};

describe("<WarningLabel>", () => {
  it("Renders correctly", () => {
    const application = [{ status: "Recheck" }];

    const tree = renderer.create(getComponent(application)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders when status "recheck" occured', () => {
    const application = [
      { status: "New" },
      { status: "Recheck" },
      { status: "New" },
    ];

    const { getByText } = render(getComponent(application));
    const labelText =
      "Step(s) need rechecking as the DIP was edited since these steps were last amended";

    expect(getByText(labelText)).toBeDefined();
  });

  it("Doesn't render when there isn't \"recheck\" status", () => {
    const application = [{ status: "New" }];

    const tree = renderer.create(getComponent(application)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
