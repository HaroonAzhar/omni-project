import { getComponentWithRedux } from "test_helpers";

import ValidateButton from "../validate_button";

describe("AML KYC validate button", () => {
  const getComponentWithDefaultStore = (aml_kyc_validation) =>
    getComponentWithRedux(
      ValidateButton,
      {
        finalizeStep: () => {},
        goStepBack: () => {},
      },
      {
        application: {
          aml_kyc_validation,
        },
      }
    );

  const signedByRegex = /Signed by .* on \d+\/\d+\/\d\d\d\d/;
  it("Does not show Signed by when not signed by mlro", () => {
    const { queryByText } = getComponentWithDefaultStore({});

    const message = queryByText(signedByRegex);

    expect(message).toBe(null);
  });

  it("Does show Signed by when signed by mlro", () => {
    const { getByText } = getComponentWithDefaultStore({
      validation_mlro_name: "foo",
      validation_mlro_date: new Date("01.02.2020"),
    });

    const message = getByText(signedByRegex);

    expect(message).toBeDefined();
  });
});
