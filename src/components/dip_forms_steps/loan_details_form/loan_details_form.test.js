import React from "react";
import { ThemeProvider } from "styled-components";
import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import { LoanDetailsForm } from "../index";

const getLoanDetailsWithTheme = (props) => {
  /* eslint-disable react/jsx-props-no-spreading, react/jsx-closing-tag-location */
  return (
    <ThemeProvider theme={{ colors: { warn: "red", darkWarn: "blue" } }}>
      <LoanDetailsForm {...props} />
    </ThemeProvider>
  );
  /* eslint-enable react/jsx-props-no-spreading, react/jsx-closing-tag-location */
};

const getLoanDetailsFormWithStoreAndTheme = (props, initialStore) => {
  return getComponentWithRedux(getLoanDetailsWithTheme, props, {
    dip: initialStore,
  });
};

describe("<LoanDetailsForm>", () => {
  const sharedState = { LoanTerm: 12, LoanPurpose: "refinance" };

  it("Require multiple draw-down loans to be Rolled Up interest", async () => {
    const onSubmit = jest.fn(() => {});

    const initialState = { ...sharedState, AdvanceType: "multiple" };
    const { getByText, queryByText } = getLoanDetailsFormWithStoreAndTheme(
      {
        finalizeStep: onSubmit,
      },
      initialState
    );

    const expectedSubmitCall = {
      data: {
        ...sharedState,
        LoanType: "rolled_up",
      },
      stepId: "loan_details",
    };

    const continueButton = getByText(/Continue/i);

    expect(queryByText(/^Type of loan$/)).not.toBeNull(); // Ensure Check the right label is present
    expect(queryByText(/^Rolled Up$/)).not.toBeNull(); // Ensure Check the right label is present

    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() => expect(onSubmit).toHaveBeenCalledWith(expectedSubmitCall));
  });

  it("Allow  other types of loan selection when single advance", async () => {
    const onSubmit = jest.fn(() => {});

    const initialState = { ...sharedState, AdvanceType: "single" };
    const { container, getByText } = getLoanDetailsFormWithStoreAndTheme(
      {
        finalizeStep: onSubmit,
      },
      initialState
    );

    const expectedLoanType = "retained";
    const expectedSubmitCall = {
      data: {
        ...sharedState,
        LoanType: expectedLoanType,
      },
      stepId: "loan_details",
    };

    const retainedOption = container.querySelector(
      `input[name='LoanType'][value=${expectedLoanType}]`
    );

    act(() => {
      fireEvent.click(retainedOption);
    });

    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() => expect(onSubmit).toHaveBeenCalledWith(expectedSubmitCall));
  });
});
