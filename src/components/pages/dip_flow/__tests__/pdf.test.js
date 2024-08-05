import React from "react";
import renderer from "react-test-renderer";

import PDF from "../pdf";
import * as data from "./__mock__/fields_data";
jest.mock("moment", () => () => ({ format: () => "10/02/2020" }));

describe("PDF TestCase", () => {
  test("should render properly component", () => {
    data.dip.CaseNr = 123;
    const mockProps = data.dip;
    const component = renderer.create(<PDF data={mockProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
